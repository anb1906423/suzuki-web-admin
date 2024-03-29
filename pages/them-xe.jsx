import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import Heading from '../components/Heading'
import Head from 'next/head'
import { swtoast } from "../mixins/swal.mixin";
import { useRouter } from 'next/router'
import CKeditor from '../components/CKeditor'
import RowVariant from '@/components/RowVariant';
import ColorSelector from '@/components/ColorSelector';
const ADDPRODUCT_URL = `${homeAPI}/admin/add-product`
import { homeAPI } from "../config"
import { Input, Switch } from 'antd';

const typeProducts = ['Xe du lịch', 'Xe thương mại']

const adminPage = () => {
  const nameRef = useRef();
  const priceRef = useRef();
  const srcRef = useRef();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [moreInfo, setMoreInfo] = useState('');
  const [outStanding, setOutStanding] = useState(false);
  const [imageTemp, setImageTemp] = useState('');

  const [selectedColours, setSelectedColours] = useState([]);
  const [fileList, setFileList] = useState([]);

  var [type, setType] = useState('');
  const [newProduct, setNewProduct] = useState(true);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const [err, setErr] = useState('')

  // const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const handleAddImage = (newImage) => {
    setFileList([...fileList, newImage]);
  }

  const handleRemoveImage = (index, file) => {
    const newImgList = [...fileList];
    newImgList[index] = newImgList[index].filter(f => f.uid !== file.uid);
    setFileList(newImgList);
  }

  const handlePreviewImage = (index, file) => {
    const newImgList = [...fileList];
    const img = newImgList[index].find(f => f.uid === file.uid);
    img.previewImage = file.url || file.preview;
    setFileList(newImgList);
  }

  useEffect(() => {
    setEditorLoaded(true);
    nameRef.current.focus();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setErr("Tên xe không được để trống!");
      nameRef.current.focus();
      return
    }
    if (!price) {
      setErr("Giá xe không được để trống!");
      priceRef.current.focus();
      return
    }
    if (!imageTemp) {
      setErr("Link ảnh không được để trống!");
      srcRef.current.focus();
      return
    }
    try {
      const typeCheck = type != '' ? type : typeProducts[0]
      type = typeCheck

      const body = { name, price, description, moreInfo, imageTemp, type, newProduct, outStanding }
      console.log(body);
      const response = await axios.post(ADDPRODUCT_URL, body
        ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ',
          },
          withCredentials: true
        }
      )
      setName('')
      setPrice('')
      setDescription('')
      setImageTemp('')
      setMoreInfo('')
      console.log(JSON.stringify(response?.data));
      console.log(response?.data);
      console.log(JSON.stringify(response))
      swtoast.success({
        text: "Xe được thêm thành công!!",
      });
      window.location.assign('/')
    } catch (err) {
      if (!err?.response) {
        setErr("No server response")
      } else if (err.response.status === 400) {
        setErr("Tên xe, giá, link ảnh, mô tả không được để trống!")
      } else if (err.response.status === 401) {
        setErr('Unauthorized')
      } else if (err.response.status === 422) {
        setErr("Xe đã tồn tại!")
        swtoast.error({
          text: "Xe này đã tồn tại!!",
        });
        nameRef.current.focus();
      } else {
        setErr("Thêm xe thất bại!");
      }
      console.log(err);
    }
    console.log(err);
  }

  return (
    <div className="admin-page">
      <Head>
        <title>Thêm xe</title>
      </Head>
      <div className='addProduct'>
        <Heading title='Thêm xe' />
        <div className="add-infor-product">
          <form className='row' id='add-product-form' action="" onSubmit={handleSubmit}>
            <div className="col-6">

              <label htmlFor="name">Tên xe:</label>
              <Input
                id="name"
                placeholder="Nhập tên xe"
                type="text"
                className="w-100"
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="line-2 d-flex w-100 flex-row flex-wrap justify-content-start">
                <div>
                  <label className="d-block" htmlFor="price">Giá:</label>
                  <Input
                    id="price"
                    type="text"
                    className=''
                    placeholder="Ví dụ: 1200000000, 560000000"
                    ref={priceRef}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <ColorSelector
                  selectedColours={selectedColours}
                  setSelectedColours={setSelectedColours}
                />
                <div>
                  <label className="d-block" htmlFor="src">Link ảnh:</label>
                  <Input
                    id="src"
                    type="text"
                    placeholder="Dán link ảnh"
                    ref={srcRef}
                    value={imageTemp}
                    onChange={(e) => setImageTemp(e.target.value)}
                  />
                </div>
              </div>
              {/* <label className="d-block" htmlFor="src">Thêm ảnh:</label>
            <Input
              type="text"
              value={imgOtherColor}
              onChange={(e) => {
                src.push(e.target.value)
                console.log(imgOtherColor);
                setImgOtherColor(imgOtherColor => [...imgOtherColor, e.target.value])
              }}
            /> */}
              <div className="selected-table">
                <label htmlFor='enter-name' className="fw-bold">Danh sách lựa chọn:</label>
                <div className="">
                  <RowVariant
                    colourSelectedList={selectedColours}
                    listImg={fileList}
                    onRemoveImage={handleRemoveImage}
                    onAddImage={handleAddImage}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div>
                <label htmlFor="description" className="d-block w-100">Mô tả:</label>
                <CKeditor
                  Placeholder={{ placeholder: "Mô tả thông tin xe ..." }}
                  name="description"
                  id="description"
                  form="add-product-form"
                  data={description}
                  onChange={(data) => {
                    setDescription(data);
                  }}
                  editorLoaded={editorLoaded}
                />
              </div>
              <div style={{ margin: "8px 0" }} className="line-3 d-flex w-100 flex-row flex-wrap justify-content-left">
                <div className="d-flex align-items-center">
                  <label htmlFor="type">Loại xe:</label>
                  <select name="" id="type" onChange={(e) => setType(e.target.value)} >
                    {
                      typeProducts.map((item, index) =>
                        <option defaultValue={item} value={item} key={index} name={item}>{item}</option>
                      )
                    }
                  </select>
                </div>
                <div style={{ margin: "6px 0" }} className="d-flex align-items-center">
                  <label onClick={() => setNewProduct(!newProduct)} htmlFor="newProduct">Xe mới:</label>
                  <Input value={newProduct} onChange={(e) => setNewProduct(!newProduct)} id="newProduct" type="checkbox" defaultChecked={newProduct} />
                  <label onClick={() => setOutStanding(!outStanding)} htmlFor="outStanding">SP mổi bật:</label>
                  <Switch
                    checked={outStanding}
                    onChange={(e) => setOutStanding(!outStanding)}
                    id="outStanding"
                    defaultChecked={outStanding}
                    size='small'
                    style={{
                      margin: "0px 4px"
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{ margin: "10px 0" }} className="col-12">
              <label htmlFor="more-info" className="d-block w-100 fw-bold">Thông tin chi tiết:</label>
              <CKeditor
                editorLoaded={editorLoaded}
                id="more-info"
                Placeholder={{ placeholder: "Thông tin chi tiết xe ..." }}
                name="more-info"
                form="add-product-form"
                data={moreInfo}
                onChange={(data) => {
                  setMoreInfo(data);
                }}
              />
            </div>
            <p className="text-danger">{err}</p>
            <div className="button-group w-100 text-center">
              <span onClick={(e) => handleSubmit(e)}>
                <button type="button" className="btn btn-success text-center visit-add-product-page">Thêm xe</button>
              </span>
            </div>
          </form>
        </div>
      </div>
      {/* <Input value={src} onChange={(e) => setSrc(e.target.value)} />
      <button onClick={handleAddImg}>submit</button> */}

      {/* {srcs.map((src, index) => (
        <ul key={index}>
          <li>
            <img src={src} />
            <button
              style={{ marginLeft: 20 }}
              onClick={() => handleDeleteImg(index)}
            >
              x
            </button>
          </li>
        </ul>
      ))} */}
    </div>
  )
}

export default adminPage
