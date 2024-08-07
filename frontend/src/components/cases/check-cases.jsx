import axios from "axios";
import { useState, useEffect } from "react";
import { ModalOpenCaseAnimation } from "./ui/modal-open-case-animation";;

export function CheckCases({ playerId, active, addMessage, setIsUpdated, setActive }) {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (!hasChecked) {
      axios.post('http://localhost/ny2025/backend/api/subtractData.php', {
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
  }, [addMessage, hasChecked]);

  return (
    <>
      {isPaymentSuccessful && (
        <ModalOpenCaseAnimation
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