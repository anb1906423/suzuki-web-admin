import React, { useState, useEffect } from 'react'
import Heading from '@/components/Heading'
import axios from 'axios'
import { homeAPI } from '../../config'
import Router from 'next/router'

const ManagementContact = () => {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const handleGetAllContacts = async () => {
            const result = await axios.get(homeAPI + '/contact/get-all')
            setContacts(result.data)
            console.log(contacts);
        }
        handleGetAllContacts()
    }, [])
    return (
        <div className="management-contact-page">
            <Heading title="Quản lý thông tin liên hệ" />
            <div className="management-contact-box table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Link to Facebook</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((user, index) => (
                            <tr key={user.id}>
                                <td>{user.address}</td>
                                <td>{user.email}</td>
                                <td>{user.linkToFace}</td>
                                <td>{user.phoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="button-group w-100 text-center">
                <span onClick={() => Router.push('/lien-he/chinh-sua')}>
                    <button type="button" className="btn btn-success text-center visit-add-product-page">Chỉnh sửa</button>
                </span>
            </div>
        </div>
    )
}

export default ManagementContact