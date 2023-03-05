import React, { useState, useEffect } from 'react'
import Heading from '@/components/Heading'
import axios from 'axios'
import { swalert, swtoast } from '@/mixins/swal.mixin'
import { homeAPI } from '@/config'
import Router from 'next/router'

const Intro = () => {
    const [intro, setIntro] = useState([])

    useEffect(() => {
        const handleGetIntro = async () => {
            try {
                const result = await axios.get(homeAPI + '/intro/get-all')
                setIntro(result.data)
            } catch (error) {
                swtoast.error({
                    text: error
                })
            }
        }

        handleGetIntro()

    }, [])

    const handleUpdateIntro = async () => {

        if (newIntro) {
            try {
                await axios.put('http://localhost:8080/api/product-variant/update-price',
                    {
                        product_variant_ids: [props.product_variant_id],
                        price: newIntro
                    })
                props.refreshProductVariantTable()
                swtoast.success({
                    text: 'Cập nhật giá mới thành công!'
                })
            } catch (e) {
                console.log(e)
                swtoast.error({
                    text: 'Xảy ra lỗi khi cập nhật giá vui lòng thử lại!'
                })
            }
        }
    }

    return (
        <div className='intro-page'>
            <Heading title="Thông tin giới thiệu" />
            <div className="intro-box">
                <table className="table table-intro">
                    <thead>
                        <tr>
                            <th className='text-uppercase text-center'>Giới thiệu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                intro && intro.map((item, index) => {
                                    return (
                                        item.intro != '' ?
                                            <td key={index}>
                                                {item.intro}
                                            </td> :
                                            <td key={index}>
                                                Hiện thông tin giới thiệu đang trống!
                                            </td>
                                    )
                                })
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="button-group w-100 text-center">
                <span onClick={() => Router.push('/gioi-thieu/chinh-sua')}>
                    <button type="button" className="btn btn-success text-center visit-add-product-page">Chỉnh sửa</button>
                </span>
            </div>
        </div>
    )
}

export default Intro