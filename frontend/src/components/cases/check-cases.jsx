import axios from "axios";
import { useState, useEffect } from "react";
import { ModalOpenCaseAnimation } from "./ui/modal-open-case-animation";
import { Modal } from "../uikit/modal";

export function CheckCases({ active, addMessage, setIsUpdated, setActive }) {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (!hasChecked) {
      axios.post('http://NY2025/backend/api/subtractData.php', {
        case_name: active.caseName,
        case_open_resource: active.openResource,
      })
      .then(response => {
        if (response.data.status === 'success') {
          console.log('Data assigned successfully');
          setIsPaymentSuccessful(true);
        } else {
          console.log(response.data.message);
          addMessage("not_enough_v2");
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
  }, [active, addMessage, hasChecked]);

  return (
    <>
      {isPaymentSuccessful && (
        <Modal active={true}>
          <ModalOpenCaseAnimation
            addMessage={addMessage}
            setIsUpdated={setIsUpdated}
            active={active}
            setActive={setActive}
          />
        </Modal>
      )}
    </>
  );
}