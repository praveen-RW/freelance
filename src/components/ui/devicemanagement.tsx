'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Link from 'next/link'
import { BarChart2, Trash2, Plus } from 'lucide-react'

interface Device {
  id: string
  longitude: number
  latitude: number
}

export default function DeviceManagement() {
  const [devices, setDevices] = useState<Device[]>([
    { id: 'device1', longitude: -122.4194, latitude: 37.7749 },
    { id: 'device2', longitude: -74.0060, latitude: 40.7128 },
  ])
  const [newDevice, setNewDevice] = useState<Device>({ id: '', longitude: 0, latitude: 0 })
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false)

  const addDevice = (e: React.FormEvent) => {
    e.preventDefault()
    if (newDevice.id && !devices.find(d => d.id === newDevice.id)) {
      setDevices([...devices, newDevice])
      setNewDevice({ id: '', longitude: 0, latitude: 0 })
      setIsAddDeviceOpen(false)
    }
  }

  const deleteDevice = (id: string) => {
    setDevices(devices.filter(device => device.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Device Management</h1>
        <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Device
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Device</DialogTitle>
            </DialogHeader>
            <form onSubmit={addDevice} className="space-y-4">
              <Input
                placeholder="Device ID"
                value={newDevice.id}
                onChange={(e) => setNewDevice({ ...newDevice, id: e.target.value })}
                required
              />
              <Input
                type="number"
                placeholder="Longitude"
                value={newDevice.longitude}
                onChange={(e) => setNewDevice({ ...newDevice, longitude: parseFloat(e.target.value) })}
                required
              />
              <Input
                type="number"
                placeholder="Latitude"
                value={newDevice.latitude}
                onChange={(e) => setNewDevice({ ...newDevice, latitude: parseFloat(e.target.value) })}
                required
              />
              <Button type="submit">Add Device</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device) => (
          <Card key={device.id}>
            <CardHeader>
              <CardTitle>{device.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Longitude: {device.longitude}</p>
              <p>Latitude: {device.latitude}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/analytics/${device.id}`}>
                <Button variant="outline" size="sm">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the device.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteDevice(device.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}