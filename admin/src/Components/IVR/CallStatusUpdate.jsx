import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useCallContext } from '../../Contexts/CallContext';

// Assuming your server is running at localhost:3000
const socket = io('http://localhost:3000'); // Use your ngrok URL in production

const CallStatusComponent = () => {
    const [callStatus, setCallStatus] = useState([]);
    const { handleEndCall, showCallPopup } = useCallContext(); // Import handleEndCall from the context

    useEffect(() => {
        console.log(showCallPopup);
        
        // Listen for call status updates
        socket.on('callStatusUpdate', (data) => {
            setCallStatus((prevStatuses) => [
                ...prevStatuses,
                { ...data, timestamp: new Date().toISOString() }, // Add a timestamp for reference
            ]);

            // Automatically end the call if the status is 'busy' or 'completed'
            if (data.status === 'busy' || data.status === 'completed') {
                handleEndCall(); // End the call by calling handleEndCall
            }
        });

        // Cleanup on unmount
        return () => {
            socket.off('callStatusUpdate');
        };
    }, [handleEndCall]);

    return (
        <div>
            <ul>
                {callStatus.map((status, index) => (
                    <li key={index}>
                        Status: {status.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CallStatusComponent;

// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import { useCallContext } from '../../Contexts/CallContext';

// // Assuming your server is running at localhost:3000
// const socket = io('http://localhost:3000'); // Use your ngrok URL in production

// const CallStatusComponent = () => {
//     const [callStatus, setCallStatus] = useState([]);
//     const {showCallPopup} = useCallContext();

//     useEffect(() => {
//         console.log(showCallPopup);
//         // Listen for call status updates
//         socket.on('callStatusUpdate', (data) => {
//             setCallStatus((prevStatuses) => [
//                 ...prevStatuses,
//                 { ...data, timestamp: new Date().toISOString() }, // Add a timestamp for reference
//             ]);
//         });

//         // Cleanup on unmount
//         return () => {
//             socket.off('callStatusUpdate');
//         };
//     }, []);

//     return (
//         <div>
//             <ul>
//                 {callStatus.map((status, index) => (
//                     <li key={index}>
//                         Status: {status.status}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default CallStatusComponent;
