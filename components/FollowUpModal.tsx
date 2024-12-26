"use client"
import React, { useState } from 'react'
import { createFollowUp } from '@/actions/followUp'

export default function FollowUpModal() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        interlocutor: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await createFollowUp(formData)
        if (result.success) {
            document.getElementById('modal')?.close()
            setFormData({ name: '', email: '', interlocutor: '' })
        } else {
            console.error('Failed to create follow-up')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="mr-4">
            <button 
                className="btn btn-error" 
                onClick={() => document.getElementById("modal").showModal()}
            >
                Créer une action
            </button>

            <dialog id="modal" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit}>
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-4 max-w-sm">
                            Nom
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="grow" 
                                placeholder="Daisy" 
                            />
                        </label>
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-4 max-w-sm">
                            Email
                            <input 
                                type="text" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="grow" 
                                placeholder="daisy@site.com" 
                            />
                        </label>
                        <label className="input input-bordered input-sm flex items-center gap-2 mb-4 max-w-sm">
                            Interlocuteur
                            <input 
                                type="text" 
                                name="interlocutor"
                                value={formData.interlocutor}
                                onChange={handleChange}
                                className="grow" 
                                placeholder="daisy@site.com" 
                            />
                        </label>
                        
                        <div className="modal-action">
                            <button type="submit" className="btn btn-error">Créer</button>
                        </div>
                    </form>
                </div>
                
                <form method="dialog" className="modal-backdrop">
                    <button className='btn btn-outline'>fermer</button>
                </form>
            </dialog>
        </div>
    )
}