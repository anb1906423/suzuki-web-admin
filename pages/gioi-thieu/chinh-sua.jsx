import React, { useState, useEffect } from 'react'
import Heading from '@/components/Heading'
import CKeditor from '@/components/CKeditor'

const EditIntroComponent = () => {
    const [intro, setIntro] = useState([])

    const [editorLoaded, setEditorLoaded] = useState(false);
    const [showEditor, setShowEditor] = useState(true);

    useEffect(() => {
        setEditorLoaded(true)
    })

    return (
        <div className="update-intro-box">
            <Heading title="Chỉnh sửa thông tin giới thiệu" />
            <CKeditor
                Placeholder={{ placeholder: "Giới thiệu ..." }}
                name="description"
                id="description"
                form="add-product-form"
                data={intro}
                onChange={(data) => {
                    setIntro(data);
                }}
                editorLoaded={editorLoaded}
            />
            <div className="button-group w-100 text-center">
                <span onClick={() => Router.push('/gioi-thieu/chinh-sua')}>
                    <button type="button" className="btn btn-success text-center visit-add-product-page">Hoàn thành</button>
                </span>
            </div>
        </div>
    )
}

export default EditIntroComponent