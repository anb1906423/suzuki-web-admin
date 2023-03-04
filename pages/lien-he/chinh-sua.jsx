import React from 'react'
import Heading from '@/components/Heading'
import Router from 'next/router'

const ManagementContact = () => {
    return (
        <div className="management-contact-page">
            <Heading title="Chỉnh sửa thông tin liên hệ" />
            <div className="management-contact-box d-flex justify-content-between">
                <div className="management-contact-item">
                    <label htmlFor='address'>Địa chỉ</label>
                    <input
                        className='w-100'
                        type="text"
                        placeholder='Đia chỉ'
                        id='address'
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor="phoneNumber">Số điện thoại</label>
                    <input
                        className='w-100'
                        type="text"
                        id='phoneNumber'
                        placeholder='Số điện thoại'
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor="email">Email</label>
                    <input
                        className='w-100'
                        type="text"
                        id='email'
                        placeholder='Email'
                    />
                </div>
                <div className="management-contact-item">
                    <label htmlFor='linkToFace'>Đường dẫn tài khoản FB</label>
                    <input
                        className='w-100'
                        type="text"
                        id='linkToFace'
                        placeholder='URL Facebook'
                    />
                </div>
            </div>
            <div className="button-group w-100 text-center">
                <span onClick={() => Router.push('/lien-he')}>
                    <button type="button" className="btn btn-success text-center visit-add-product-page">Hoàn thành</button>
                </span>
            </div>
        </div>
    )
}

export default ManagementContact