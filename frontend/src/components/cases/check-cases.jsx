import axios from "axios";
import { useState, useEffect } from "react";
import { ModalOpenCaseAnimation } from "./ui/modal-open-case-animation";;

export function CheckCases({ backendPath, playerId, active, addMessage, setIsUpdated, setActive }) {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        console.log("Enter заблоковано!");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  useEffect(() => {
    if (!hasChecked) {
      axios.post(`${backendPath}api/subtractData.php`, {
        playerId: playerId,
        case_name: active.caseName,
        case_open_resource: active.openResource,
      })
        .then(response => {
          if (response.data.status === 'success') {
            //console.log('Data assigned successfully');
            setIsPaymentSuccessful(true);
          } else {
            console.log(response.data.message);
            addMessage("not_enough");
            setActive(false);
          }
          setHasChecked(true);
        })
        .catch(error => {
          console.error('There was an error!', error);
          addMessage("error", "There was an error while processing your request.");
          setHasChecked(true);
          setActive(false);
        });
    }
  }, [ backendPath, addMessage, hasChecked, active.caseName, active.openResource, playerId, setActive]);

  return (
    <>
      {isPaymentSuccessful && (
        <ModalOpenCaseAnimation
          backendPath={backendPath}
          playerId={playerId}
          addMessage={addMessage}
          setIsUpdated={setIsUpdated}
          active={active}
          setActive={setActive}
        />
      )}
    </>
  );
}