"use client"
import React from 'react'
import CreateFollowUp from "./CreateFollowUp"

export default function FollowUpModal() {
    return (
        <div className="mr-4">
            <button 
                className="btn btn-error" 
                onClick={() => document.getElementById('my_modal_1').showModal()}
            >
                Créer une action
            </button>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <div className="modal-action">
                        <form method="dialog">
                            <CreateFollowUp/>
                            <button className="btn">Créer</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}