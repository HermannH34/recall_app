
export default async function CreateFollowUp() {
 return (
  <dialog id="my_modal_2" className="modal">
   <div className="modal-box">
    <label className="input input-bordered flex items-center gap-2">
     Nom
     <input type="text" className="grow" placeholder="Daisy" />
    </label>
    <label className="input input-bordered flex items-center gap-2">
     Email
     <input type="text" className="grow" placeholder="daisy@site.com" />
    </label>
    <label className="input input-bordered flex items-center gap-2">
     Type de juriste
     <input type="text" className="grow" placeholder="daisy@site.com" />
    </label>
   </div>
   <form method="dialog" className="modal-backdrop">
    <button>fermer</button>
   </form>
  </dialog>
 )

}

