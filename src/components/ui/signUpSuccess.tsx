import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import StepperGuide from './signUpSuccess';

// Card component for each step
const Card = ({ children, className }) => {
  return <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>{children}</div>;
};

const SignUpSuccess = ({ device_name, device_id, latitude, longitude }) => {
  const videoRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0); // Track the current step

  const guideData = {
    title: "Noise Monitor Setup Guide 👩‍🔧",
    subtitle: "Follow simple steps to set up your noise monitor😎😎 device",
    date: "2024-09-30",
    author: "RandomWalk Team",
    steps: [
      { id: 1, content: [{ text: "First, sign up on " }, { text: "our website", url: "https://randomwalk-ai.com/signup" }], type: "text", timestamp: 0 },
      { id: 2, content: 'After signing up, you will receive the following details. Please save them.', type: "gif", mediaUrl: "/deviceSetupGuide/device_details.png", timestamp: 30 },
      { id: 3, content: [{ text: "Now go to our " }, { text: "👉GitHub repository", url: "https://github.com/randomwalk-ai/noiseMonitoring" }, { text: " for the Arduino code." }], type: "text", timestamp: 60 },
      { id: 4, content: "Enter your Wifi name🛜 & password🔑 here within the quotes", type: "gif", mediaUrl: "/deviceSetupGuide/WIFIDetails.png", timestamp: 90 },
      { id: 5, content: "Enter the 📌 latitude and longitude ", type: "gif", mediaUrl: "/deviceSetupGuide/lat_&_long.png", timestamp: 120 },
      { id: 6, content: "Enter the device ID details here within the quotes", type: "gif", mediaUrl: "/deviceSetupGuide/device_id.png", timestamp: 150 },
      { id: 7, content: "Now follow this video to set up the device at your location", type: "video", mediaUrl: "/deviceSetupGuide/setup_video.mp4", timestamp: 180 },
    ]
  };

  // Function to handle clicking on a step to update video or content dynamically
  const handleStepClick = (index) => {
    setCurrentStep(index);
    const video = videoRef.current;
    const selectedStep = guideData.steps[index];

    if (video && selectedStep.type === 'video') {
      video.currentTime = selectedStep.timestamp; // Jump to the timestamp
      video.play();
    }
  };

  return (
    <div className='flex flex-wrap items-center justify-center lg:flex-nowrap w-[100vw] h-screen'>
      {/* Left Section: Video and Device Details */}
      <div className='w-full lg:w-[50vw] flex flex-col items-center p-4'>
        {/* Video on top */}
        <div className='w-full lg:h-[60vh]'>
          <video
            ref={videoRef}
            controls
            className="w-full rounded-lg mb-4"
            src={guideData.steps[currentStep].type === 'video' ? guideData.steps[currentStep].mediaUrl : '/deviceSetupGuide/setup_video.mp4'}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Device details below */}
        <div className="p-4 bg-white shadow-md rounded-lg mt-4 max-w-sm w-full">
          <div className="flex items-center mb-3">
            <i className="fas fa-microchip text-blue-500 mr-3"></i>
            <p className="text-gray-700 font-semibold text-lg">
              Device ID: <span className="font-bold">{device_id}</span>
            </p>
          </div>
          <div className="flex items-center mb-3">
            <i className="fas fa-id-badge text-green-500 mr-3"></i>
            <p className="text-gray-700 font-semibold text-lg">
              Device Name: <span className="font-bold">{device_name}</span>
            </p>
          </div>
          <div className="flex items-center mb-3">
            <i className="fas fa-map-marker-alt text-red-500 mr-3"></i>
            <p className="text-gray-700 font-semibold text-lg">
              Latitude: <span className="font-bold">{latitude}</span>
            </p>
          </div>
          <div className="flex items-center">
            <i className="fas fa-map-marker-alt text-red-500 mr-3"></i>
            <p className="text-gray-700 font-semibold text-lg">
              Longitude: <span className="font-bold">{longitude}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section: Stepper Guide */}
      <div className='w-full lg:w-[50vw] mt-8 flex justify-center '>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg overflow-y-auto h-[100vh]">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{guideData.title}</h1>
              <p className="text-gray-600">{guideData.subtitle}</p>
            </div>
          </div>

          {guideData.steps.map((step, index) => (
            <Card key={step.id} className="mb-6  cursor-pointer" onClick={() => handleStepClick(index)}>
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-700 font-semibold">{step.id}</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">{typeof step.content === 'string' ? step.content : step.content.map((item, idx) => item.url ? <Link href={item.url} key={idx} className="text-purple-600 hover:underline">{item.text}</Link> : item.text)}</h2>
              </div>
              {step.type !== 'text' && step.mediaUrl && (
                <div className="mt-2">
                  {step.type === 'video' ? (
                    <motion.video controls className="w-full rounded-lg" whileHover={{ scale: 1.05 }}>
                      <source src={step.mediaUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </motion.video>
                  ) : (
                    <Image
                      src={step.mediaUrl}
                      alt={`Step ${step.id}`}
                      width={300}
                      height={200}
                      layout="responsive"
                      className="rounded-lg"
                    />
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignUpSuccess;



// import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { Card } from './card'

// interface LinkData {
//   text: string
//   url: string
// }

// interface Step {
//   id: number
//   content: string | LinkData[]
//   type: 'text' | 'video' | 'gif'
//   mediaUrl?: string
// }

// const StepperGuide: React.FC = () => {

//   // Guide data defined within the component itself
//   const guideData = {
//     title: "Noise Monitor Setup Guide 👩‍🔧",
//     subtitle: "Follow simple steps to set up your noise monitor😎😎 device",
//     date: "2024-09-30",
//     author: "RandomWalk Team",
//     steps: [
//       { 
//         id: 1, 
//         content: [
//           { text: "First, sign up on " },
//           { text: "our website", url: "https://randomwalk-ai.com/signup" },
//         ], 
//         type: "text" 
//       },
//       { 
//         id: 2, 
//         content: 'After signing up, you will receive the following details. Please save them.', 
//         type: "gif", 
//         mediaUrl: "/deviceSetupGuide/device_details.png" 
//       },
//       {
//         id: 3,
//         content: [
//           { text: "Now go to our " },
//           { text: "👉GitHub repository", url: "https://github.com/randomwalk-ai/noiseMonitoring" },
//           { text: " for the Arduino code." }
//         ],
//         type: "text"
//       },
//       { 
//         id: 4, 
//         content: "Enter your Wifi name🛜 & password🔑 here within the quotes", 
//         type: "gif", 
//         mediaUrl: "/deviceSetupGuide/WIFIDetails.png" 
//       },
//       { 
//         id: 5, 
//         content: "Enter the 📌 latitude and longitude ", 
//         type: "gif", 
//         mediaUrl: "/deviceSetupGuide/lat_&_long.png"
//       },
//       { 
//         id: 6, 
//         content: "Enter the device ID details here within the quotes", 
//         type: "gif", 
//         mediaUrl: "/deviceSetupGuide/device_id.png" 
//       },
//       { 
//         id: 7, 
//         content: "Now follow this video to set up the device at your location", 
//         type: "video", 
//         mediaUrl: "/deviceSetupGuide/setup_video.mp4" 
//       },
//     ]
//   }

//   const renderContent = (content: string | LinkData[]) => {
//     if (typeof content === 'string') {
//       return content
//     }
//     return content.map((item, index) => (
//       <React.Fragment key={index}>
//         {item.url ? (
//           <Link href={item.url} className="text-purple-600 hover:underline">
//             {item.text}
//           </Link>
//         ) : (
//           item.text
//         )}
//       </React.Fragment>
//     ))
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg overflow-y-auto h-[100vh]">
//       <div className="flex items-center mb-6 h-[10vh]">
//         <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
//           <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">{guideData.title}</h1>
//           <p className="text-gray-600">{guideData.subtitle}</p>
//         </div>
//       </div>
      
//       {guideData.steps.map((step) => (
//         <Card key={step.id} className="mb-6 p-6">
//           <div className="flex items-center mb-2">
//             <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center mr-3">
//               <span className="text-purple-700 font-semibold">{step.id}</span>
//             </div>
//             <h2 className="text-lg font-semibold text-gray-800">{renderContent(step.content)}</h2>
//           </div>
//           {step.type !== 'text' && step.mediaUrl && (
//             <div className="mt-2">
//               {step.type === 'video' ? (
//                 <video controls className="w-full rounded-lg">
//                   <source src={step.mediaUrl} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               ) : (
//                 <Image
//                   src={step.mediaUrl}
//                   alt={`Step ${step.id}`}
//                   width={300}
//                   height={200}
//                   layout="responsive"
//                   className="rounded-lg"
//                 />
//               )}
//             </div>
//           )}
//         </Card>
//       ))}
//     </div>
//   )
// }

// export default StepperGuide;
