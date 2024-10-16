import React from 'react'
import Link from 'next/link'
import { Card } from '../ui/card'

interface LinkData {
  text: string
  url: string
}

interface Step {
  id: number
  content: string | LinkData[]
  type: 'text' | 'video' | 'gif' | 'timestamp'
  mediaUrl?: string
  time?: number // To store the timestamp for video skipping
}

const StepperGuide: React.FC = () => {
  const guideData = {
    title: "Noise Monitor Setup Guide 👩‍🔧",
    subtitle: "Follow simple steps to set up your noise monitor😎😎 device",
    date: "2024-09-30",
    author: "RandomWalk Team",
    steps: [
      {
        id: 1,
        content: [
          { text: "First, sign up on " },
          { text: "our website", url: "https://randomwalk-ai.com/signup" },
        ],
        type: "text"
      },
      {
        id: 2,
        content: 'After signing up, you will receive the following details. Please save them.',
        type: "gif",
        mediaUrl: "/deviceSetupGuide/device_details.png"
      },
      {
        id: 3,
        content: [
          { text: "Now go to our " },
          { text: "👉GitHub repository", url: "https://github.com/randomwalk-ai/noiseMonitoring" },
          { text: " for the Arduino code." }
        ],
        type: "text"
      },
      {
        id: 4,
        content: "Rick starts dancing at 0:10",
        type: "timestamp",
        time: 10
      },
      {
        id: 5,
        content: "Chorus starts at 0:45",
        type: "timestamp",
        time: 45
      },
      {
        id: 6,
        content: "Rick dances with backup dancers at 1:20",
        type: "timestamp",
        time: 80
      },
      {
        id: 7,
        content: "Video ends at 2:30",
        type: "timestamp",
        time: 150
      }
    ]
  }

  // Function to skip the video to the given timestamp
  const handleSkip = (time: number) => {
    const video = document.querySelector("video")
    if (video) {
      video.currentTime = time
      video.play()
    }
  }

  const renderContent = (content: string | LinkData[]) => {
    if (typeof content === 'string') {
      return content
    }
    return content.map((item, index) => (
      <React.Fragment key={index}>
        {item.url ? (
          <Link href={item.url} className="text-purple-600 hover:underline">
            {item.text}
          </Link>
        ) : (
          item.text
        )}
      </React.Fragment>
    ))
  }

  return (
    <div className="flex justify-center items-center">
        <div className='w-[50vw] p-6'>
            <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{guideData.title}</h1>
                    <p className="text-gray-600">{guideData.subtitle}</p>
                </div>
            </div>
            <div className="mb-6">
                <video controls className="w-full rounded-lg">
                <source src="https://www.example.com/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            </div>
        </div>

      {/* Render the video that will be used for skipping */}
        <div className='w-[40vw] overflow-y-auto h-[80vh]'>
            {guideData.steps.map((step) => (
                <Card key={step.id} className="mb-6 p-6">
                <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-purple-700 font-semibold">{step.id}</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">{renderContent(step.content)}</h2>
                </div>
                {/* Handle timestamps for skipping the video */}
                {step.type === 'timestamp' && step.time && (
                    <button
                    onClick={() => handleSkip(step.time)}
                    className="text-purple-600 hover:underline"
                    >
                    Skip to {new Date(step.time * 1000).toISOString().substr(14, 5)}
                    </button>
                )}
                {step.type !== 'text' && step.mediaUrl && (
                    <div className="mt-2">
                    {step.type === 'video' ? (
                        <video controls className="w-full rounded-lg">
                        <source src={step.mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img
                        src={step.mediaUrl}
                        alt={`Step ${step.id}`}
                        className="rounded-lg"
                        />
                    )}
                    </div>
                )}
                </Card>
            ))}
        </div>
    </div>
    
  )
}

export default StepperGuide




// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/0FO7VtXfCfI
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// export default function Component() {
//     return (
//       <div className="grid md:grid-cols-[1fr_300px] gap-4 p-4 md:p-8">
//         <div className="relative rounded-lg overflow-hidden aspect-video">
//           <video className="w-full h-full object-cover" controls controlsList="nodownload">
//             <source src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" type="video/mp4" />
//           </video>
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end">
//             <div className="p-4 text-white">
//               <h2 className="text-2xl font-bold">Never Gonna Give You Up</h2>
//               <div className="text-sm text-muted-foreground">Rick Astley - Official Music Video</div>
//             </div>
//           </div>
//         </div>
//         <div className="bg-muted rounded-lg p-4 overflow-auto">
//           <div className="mt-4 text-sm text-muted-foreground">
//             This iconic song by Rick Astley is a classic example of the "Rick Roll" meme. The video features Astley
//             dancing and singing, with his signature smooth vocals and retro style. It's a fun, upbeat track that has
//             become a beloved internet phenomenon.
//           </div>
//           <h3 className="text-lg font-semibold mb-4">Key Moments</h3>
//           <div className="grid gap-2">
//             <button
//               className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted-foreground/10 transition-colors"
//               onClick={() => {
//                 const video = document.querySelector("video")
//                 video.currentTime = 10
//                 video.play()
//               }}
//             >
//               <div className="text-primary font-medium">0:10</div>
//               <div className="flex-1 text-sm">Rick starts dancing</div>
//             </button>
//             <button
//               className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted-foreground/10 transition-colors"
//               onClick={() => {
//                 const video = document.querySelector("video")
//                 video.currentTime = 45
//                 video.play()
//               }}
//             >
//               <div className="text-primary font-medium">0:45</div>
//               <div className="flex-1 text-sm">Chorus starts</div>
//             </button>
//             <button
//               className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted-foreground/10 transition-colors"
//               onClick={() => {
//                 const video = document.querySelector("video")
//                 video.currentTime = 80
//                 video.play()
//               }}
//             >
//               <div className="text-primary font-medium">1:20</div>
//               <div className="flex-1 text-sm">Rick dances with backup dancers</div>
//             </button>
//             <button
//               className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted-foreground/10 transition-colors"
//               onClick={() => {
//                 const video = document.querySelector("video")
//                 video.currentTime = 150
//                 video.play()
//               }}
//             >
//               <div className="text-primary font-medium">2:30</div>
//               <div className="flex-1 text-sm">Video ends</div>
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }