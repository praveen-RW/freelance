import React from 'react';
import StepperGuide from '../ui/signUpSuccess';

const SignUpSuccess = ({ device_name, device_id, latitude, longitude }) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap w-[100vw] h-screen bg-gray-50">
      {/* Left Section: Video and Device Details */}
      <div className="w-full lg:w-[60%] p-4 flex flex-col items-center">
        {/* Video on top */}
        <div className="w-full max-w-[800px]">
          <video controls className="w-full rounded-lg mb-6 shadow-lg">
            <source src="/deviceSetupGuide/setup_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Device details below */}
        <div className="p-4 bg-white shadow-md rounded-lg mt-4 w-full max-w-[600px]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Device Details</h2>
          <div className="flex items-center mb-3">
            <i className="fas fa-microchip text-blue-500 mr-3"></i>
            <p className="text-gray-700 font-semibold">
              Device ID: <span className="font-bold">{device_id}</span>
            </p>
          </div>
          <div className="flex items-center mb-3">
            <i className="fas fa-id-badge text-green-500 mr-3"></i>
            <p className="text-gray-700 font-semibold">
              Device Name: <span className="font-bold">{device_name}</span>
            </p>
          </div>
          <div className="flex items-center mb-3">
            <i className="fas fa-map-marker-alt text-red-500 mr-3"></i>
            <p className="text-gray-700 font-semibold">
              Latitude: <span className="font-bold">{latitude}</span>
            </p>
          </div>
          <div className="flex items-center">
            <i className="fas fa-map-marker-alt text-red-500 mr-3"></i>
            <p className="text-gray-700 font-semibold">
              Longitude: <span className="font-bold">{longitude}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section: Stepper Guide with Time Stamps */}
      <div className="w-full lg:w-[50%] p-4 overflow-y-auto h-full">
        
        <StepperGuide />
      </div>
    </div>
  );
};

export default SignUpSuccess;


// import React from 'react'
// import { motion } from 'framer-motion'
// import { CheckCircle } from 'lucide-react'
// import StepperGuide from '../ui/stepper-guide'

// const SignUpSuccess = ({device_name, device_id, latitude, longitude}) => {
    

//   return (
    
//     <div className='flex lg:w-[100vw]'>
//         <div>

//         </div>
//         <div className='w-[50vw] flex  justify-center '>
//             Signup Success
//             <div>
//             <div className="p-4 bg-white shadow-md rounded-lg mt-4 max-w-sm">
//                 <div className="flex items-center mb-3">
//                     <i className="fas fa-microchip text-blue-500 mr-3"></i>
//                     <p className="text-gray-700 font-semibold text-lg">Device ID: <span className="font-bold">{device_id}</span></p>
//                 </div>
//                 <div className="flex items-center mb-3">
//                     <i className="fas fa-id-badge text-green-500 mr-3"></i>
//                     <p className="text-gray-700 font-semibold text-lg">Device Name: <span className="font-bold">{device_name}</span></p>
//                 </div>
//                 <div className="flex items-center mb-3">
//                     <i className="fas fa-map-marker-alt text-red-500 mr-3"></i>
//                     <p className="text-gray-700 font-semibold text-lg">Latitude: <span className="font-bold">{latitude}</span></p>
//                 </div>
//                 <div className="flex items-center">
//                     <i className="fas fa-map-marker-alt text-red-500 mr-3"></i>
//                     <p className="text-gray-700 font-semibold text-lg">Longitude: <span className="font-bold">{longitude}</span></p>
//                 </div>
//             </div>

//             </div>
//         </div>
//       <div className='w-[50vw]'>
//         <StepperGuide />
//       </div>
//     </div>
//   )
// }

// export default SignUpSuccess

