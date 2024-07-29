import { TankBlock } from "../../../uikit/tank-block";

export function ModalStorageTanks({ userTanks }) {
  return (
    <>
      {userTanks.map((tank, index) => (
         <TankBlock key={index} tankInfo={tank} />
      ))}
    </>
  );
}