
interface FollowUpButtonProps {
 followUpNumber: number;
}
export default async function FollowUpButton({ followUpNumber }: FollowUpButtonProps) {
 const buttonColor = determineButtonColor(followUpNumber)
 const buttonMessage = followUpNumber === 0 ? "Premier contact" : `Relance: ${followUpNumber}`

 return (
  <button className={`btn btn-outline ${buttonColor}`}>{buttonMessage}</button>
 )

}

const determineButtonColor = (followUpNumber: number) => {

 const buttonInfos: { [key: number]: string } = {
  0: "btn-info",
  1: "btn-success",
  2: "btn-error"
 }

 return buttonInfos[followUpNumber]
}
