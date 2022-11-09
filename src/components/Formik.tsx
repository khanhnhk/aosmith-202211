import { Formik, Field, Form, ErrorMessage } from 'formik'
import React, { FormEvent, useState } from 'react'
import Thumbnail from './Thumbnail'

import PocketBase from 'pocketbase'

const client = new PocketBase('http://127.0.0.1:8090')

const { token } = await client.admins.authViaEmail(
  'admin@gmail.com',
  '123456admin'
)

const branchData = await client.records.getList('branch')
const branches = Object.entries(branchData.items)
var branchInfos = {}
for (const branch of branches) {
  branchInfos[branch[1].name.trim().toLowerCase()] = branch[1].phone
}

const provinces = [
  'An Giang',
  'Bà Rịa – Vũng Tàu',
  'Bình Dương',
  'Bình Phước',
  'Bình Thuận',
  'Bình Định',
  'Bạc Liêu',
  'Bắc Giang',
  'Bắc Kạn',
  'Bắc Ninh',
  'Bến Tre',
  'Cao Bằng',
  'Cà Mau',
  'Cần Thơ',
  'Điện Biên',
  'Đà Nẵng',
  'Đắk Lắk',
  'Đắk Nông',
  'Đồng Nai',
  'Đồng Tháp',
  'Gia Lai',
  'Hà Giang',
  'Hà Nam',
  'Hà Nội',
  'Hà Tĩnh',
  'Hòa Bình',
  'Hưng Yên',
  'Hải Dương',
  'Hải Phòng',
  'Hậu Giang',
  'Khánh Hòa',
  'Kiên Giang',
  'Kon Tum',
  'Lai Châu',
  'Long An',
  'Lào Cai',
  'Lâm Đồng',
  'Lạng Sơn',
  'Nam Định',
  'Nghệ An',
  'Ninh Bình',
  'Ninh Thuận',
  'Phú Thọ',
  'Phú Yên',
  'Quảng Bình',
  'Quảng Nam',
  'Quảng Ngãi',
  'Quảng Ninh',
  'Quảng Trị',
  'Sóc Trăng',
  'Sơn La',
  'TP Hồ Chí Minh',
  'Thanh Hóa',
  'Thái Bình',
  'Thái Nguyên',
  'Thừa Thiên Huế',
  'Tiền Giang',
  'Trà Vinh',
  'Tuyên Quang',
  'Tây Ninh',
  'Vĩnh Long',
  'Vĩnh Phúc',
  'Yên Bái'
]

const models = [
  'A1',
  'A2',
  'ADR75-V-ET-1',
  'AO-MF-ADV',
  'AR600-U3',
  'AR75-A-S-1E',
  'AR75-A-S-2',
  'AR75-A-S-H1',
  'AR75-U2',
  'C1',
  'C2',
  'Daisy',
  'Daisy Plus',
  'E2',
  'E3',
  'G1',
  'G2',
  'K400',
  'KJ420F-B01',
  'KJ500F-B01',
  'AR600-C-S-1',
  'M1',
  'M2',
  'P6',
  'P7',
  'R400E',
  'R400S',
  'S400',
  'S600',
  'VITA',
  'VITA Plus',
  'Z4',
  'Z7'
]

const phonePrefixes = [
  '032',
  '033',
  '034',
  '035',
  '036',
  '037',
  '038',
  '039',
  '070',
  '079',
  '077',
  '076',
  '078',
  '083',
  '084',
  '085',
  '081',
  '082',
  '056',
  '058',
  '059'
]

export default function FormikForm() {
  const previewImages = (files: FileList) => {
    const filePaths = [...files].map(file => URL.createObjectURL(file))

    return filePaths.map((file, i) => {
      return <Thumbnail key={i} file={file} />
    })
  }

  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const uploadImages = (e: FormEvent) => {}

  const handleSubmit = async (e: any) => {
    const formData = new FormData()
    Object.entries(e).forEach(([key, value]) => {
      if (key != 'images') {
        formData.append(key.toLowerCase(), value)
        console.log(key.toLowerCase(), value)
      } else {
        console.log(key.toLowerCase(), value)
        for (const image of value) {
          formData.append(key.toLowerCase(), image)
          console.log(key.toLowerCase(), image)
        }
      }
    })

    // upload and create new record
    await client.records
      .create('installations', formData)
      .then(record => {
        setUploadSuccess(true)
      })
      .catch(err => {
        setUploadSuccess(false)
        setErrorMessage(err.message)
      })
  }
  return (
    <Formik
      initialValues={{
        branchName: '',
        branchPhone: '',

        customerName: '',
        customerPhone: '',
        customerProvince: '',
        customerAddress: '',

        model: '',
        serial: '',
        installDate: '',
        images: []
      }}
      validate={values => {
        const errors = {}
        const branchName = values.branchName.trim().toLowerCase()
        const branchPhone = values.branchPhone.trim()

        if (branchName.length < 1) {
          errors.branchName = 'Cần điền tên đại lý'
        } else if (!(branchName in branchInfos)) {
          errors.branchName = 'Không tìm thấy thông tin đăng ký của đại lý'
        }

        if (branchPhone.length != 10 || !/^\d{10}$/.test(branchPhone)) {
          errors.branchPhone = 'Cần điền SĐT đại lý gồm 10 chữ số'
        }

        if (branchPhone != branchInfos[branchName]) {
          errors.branchPhone = 'SĐT đăng ký không khớp'
        }

        if (values.images.length > 5) {
          errors.images = 'Hệ thống chỉ nhận tối đa 5 tấm ảnh, vui lòng tải lại'
        }

        if (values.customerName.trim().length < 1) {
          errors.customerName = 'Vui lòng điền tên khách hàng'
        }

        const customerPhone = values.branchPhone.trim()
        if (customerPhone.length < 1 || /^\d{10}$/.test(customerPhone)) {
          errors.customerPhone =
            'Vui lòng điền SĐT khách hàng gồm 10 chữ số bắt đầu bằng 0'
        }

        if (!phonePrefixes.includes(customerPhone.substring(0, 3))) {
          errors.customerPhone = 'Nhà mạng chưa được khai báo'
        }

        return errors
      }}
      onSubmit={(values, actions) => {
        handleSubmit(values).then(() => {
          actions.setSubmitting(false)
          actions.resetForm()
        })
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
      }) => (
        <>
          <Form className="grid p-4 w-full max-w-full" onSubmit={handleSubmit}>
            {/* Branch info */}
            <fieldset className="p-4 w-full">
              <legend className="uppercase font-extrabold text-xl">
                1.Thông tin đại lý
              </legend>
              <div className="grid md:grid-cols-2 py-4 bg-white rounded-2xl box-content place-content-center">
                <div>
                  <div className="flex flex-col p-4">
                    <label htmlFor="branchName" className="mx-2">
                      Tên đại lý
                    </label>
                    <Field
                      id="branchName"
                      name="branchName"
                      type="branchName"
                      value={values.branchName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-input bg-light-green rounded-lg p-2 mx-2"
                      // required
                    />
                    <ErrorMessage
                      name="branchName"
                      className="error-message"
                      component="span"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex flex-col p-4">
                    <label htmlFor="branchPhone" className="mx-2">
                      SĐT đại lý đăng ký
                    </label>
                    <Field
                      id="branchPhone"
                      name="branchPhone"
                      value={values.branchPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="tel"
                      // required
                      className="form-input bg-light-green rounded-lg p-2 mx-2"
                    />
                    <ErrorMessage
                      name="branchPhone"
                      className="error-message"
                      component="span"
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Customer info */}
            <div>
              <fieldset className="p-4 w-full">
                <legend className="uppercase font-extrabold text-xl">
                  2.Thông tin khách hàng
                </legend>
                <div className="bg-white box-content py-4 rounded-xl">
                  <div className=" p-4 flex flex-col bg-white rounded-2xl place-content-center">
                    <div className="grid md:grid-cols-2 grid-flow-dense">
                      <div>
                        <div className="flex flex-col py-4">
                          <label htmlFor="customerName" className="mx-2">
                            Tên khách hàng
                          </label>
                          <Field
                            id="customerName"
                            name="customerName"
                            value={values.customerName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-input bg-light-green rounded-lg p-2 mx-2"
                          />
                        </div>
                        <ErrorMessage
                          name="customerName"
                          className="error-message"
                          component="span"
                        />
                      </div>

                      <div>
                        <div className="flex flex-col py-4">
                          <label htmlFor="customerPhone" className="mx-2">
                            SĐT khách hàng
                          </label>
                          <Field
                            id="customerPhone"
                            name="customerPhone"
                            value={values.customerPhone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="tel"
                            // required
                            className="form-input bg-light-green rounded-lg p-2 mx-2"
                          />
                          <ErrorMessage
                            name="customerPhone"
                            className="error-message"
                            component="span"
                          />
                        </div>
                      </div>
                    </div>
                    <span className="font-bold mx-6">A. Địa chỉ mua hàng</span>
                    <div className="grid md:grid-cols-5">
                      <div className="md:col-span-2">
                        <div className="flex flex-col py-4">
                          <label htmlFor="customerProvince" className="mx-2">
                            Tỉnh/ Thành phố
                          </label>
                          <Field
                            as="select"
                            id="customerProvince"
                            name="customerProvince"
                            value={values.customerProvince}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="select"
                            // required
                            className="form-input bg-light-green rounded-lg p-2 mx-2"
                          >
                            {provinces.map((item, idx) => {
                              return (
                                <option key={idx} value={item}>
                                  {item}
                                </option>
                              )
                            })}
                          </Field>
                        </div>
                        <ErrorMessage
                          name="customerProvince"
                          className="error-message"
                          component="span"
                        />
                      </div>

                      <div className="col-span-3">
                        <div className="flex flex-col py-4">
                          <label htmlFor="customerAddress" className="mx-2">
                            Địa chỉ cụ thể
                          </label>
                          <Field
                            id="customerAddress"
                            name="customerAddress"
                            value={values.customerAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="select"
                            // required
                            className="form-input bg-light-green rounded-lg p-2 mx-2"
                          />
                          <ErrorMessage
                            name="customerAddress"
                            className="error-message"
                            component="span"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Model */}
                    <span className="font-bold mx-6">B. Model</span>
                    <div className="md:grid grid-cols-3">
                      <div className="col-span-1">
                        <div className="flex flex-col py-4">
                          <label htmlFor="model" className="mx-2">
                            Model
                          </label>
                          <Field
                            as="select"
                            id="model"
                            name="model"
                            value={values.model}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="select"
                            // required
                            className="form-input bg-light-green rounded-lg p-2 mx-2"
                          >
                            {models.map((item, idx) => {
                              return (
                                <option key={idx} value={item}>
                                  {item}
                                </option>
                              )
                            })}
                          </Field>
                          <ErrorMessage
                            name="model"
                            className="error-message"
                            component="span"
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="flex flex-col py-4">
                          <label htmlFor="serial" className="mx-2">
                            Serial
                          </label>
                          <Field
                            id="serial"
                            name="serial"
                            value={values.serial}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="select"
                            // required
                            className="form-input bg-light-green rounded-lg p-2 mx-2"
                          />
                          <ErrorMessage
                            name="serial"
                            className="error-message"
                            component="span"
                          />
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="flex flex-col py-4">
                          <label htmlFor="installDate" className="mx-2">
                            Thời gian lắp đặt
                          </label>
                          <Field
                            id="installDate"
                            name="installDate"
                            value={values.installDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="date"
                            // required
                            className="form-input bg-light-green rounded-lg p-2 mx-2"
                          />
                        </div>
                      </div>
                    </div>

                    <span className="text-center">
                      Hình ảnh phiếu mua hàng/ hóa đơn hợp lệ:
                    </span>
                    <div className="flex px-2 items-center justify-center">
                      {previewImages(values.images)}
                    </div>
                    <ErrorMessage
                      name="images"
                      className="error-message"
                      component="span"
                    />
                    <img
                      id="upload-image-btn"
                      src="/images/upload-images.png"
                      alt=""
                      className="h-9 mx-auto my-4"
                      onClick={() => {
                        document.getElementById('upload-images')?.click()
                      }}
                    />
                    <input
                      id="upload-images"
                      type="file"
                      name="images"
                      multiple
                      accept="image/*"
                      className="invisible"
                      hidden
                      onChange={event => {
                        setFieldValue('images', event.currentTarget.files)
                      }}
                    />
                    {uploadSuccess ? (
                      <span className="text-green-600">
                        Đã gửi đơn thành công
                      </span>
                    ) : null}
                    {errorMessage ? (
                      <span className="error-message">
                        Gửi đơn không thành công, vui lòng kiểm tra lại. (
                        {errorMessage})
                      </span>
                    ) : null}
                    <input
                      id="install-form-submit-btn"
                      type="submit"
                      value="Gửi thông tin"
                      className="bg-dark-green mx-auto text-white text-xl font-bold p-2 px-6 rounded-full uppercase"
                    ></input>
                  </div>
                </div>
              </fieldset>
            </div>
          </Form>
        </>
      )}
    </Formik>
  )
}
