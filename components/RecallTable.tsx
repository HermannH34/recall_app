import Recall from "@/models/Recall";
import connectMongo from "@/libs/mongoose";
import RecallCheckbox from "./RecallCheckbox"


async function getRecalls() {
  try {
    await connectMongo();
    const recalls = await Recall.find()

    return recalls
  } catch (error) {
    console.error('Error fetching recalls:', error)
    return []
  }
}

export default async function RecallTable() {
  const recalls = await getRecalls()

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" disabled />
              </label>
            </th>
            <th>Nom</th>
            <th>Motif de Rappel</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {recalls.map((recall) => (
            <tr key={recall._id}>
              <th>
                <RecallCheckbox 
                  recallId={recall._id.toString()} 
                  initialChecked={recall.wasRecalled}
                />
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{recall.name}</div>
                  </div>
                </div>
              </td>
              <td>{recall.motive}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 