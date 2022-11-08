import { Formik, Field, Form } from 'formik'
import React from 'react'

export default function FormikForm() {
  const handleSubmit = e => {
    console.log(e)
  }
  return (
    <>
      <Formik
        initialValues={{
          branchName: '',
          branchPhone: ''
        }}
        onSubmit={handleSubmit}
      >
        <Form className="grid pt-4 w-full max-w-full">
          {/* Branch info */}
          <fieldset className="p-4 w-full">
            <legend className="uppercase font-extrabold text-xl">
              1.Thông tin đại lý
            </legend>
            <div className="grid grid-cols-5 p-4 bg-white rounded-2xl box-content place-content-center">
              <div className="col-span-2">
                <div className="flex flex-col p-4">
                  <label htmlFor="branchName" className="mx-2">
                    Tên đại lý
                  </label>
                  <Field
                    id="branchName"
                    name="branchName"
                    className="bg-light-green rounded-lg p-2 mx-2 h-8"
                    required
                  />
                </div>
              </div>

              <div className="col-span-2">
                <div className="flex flex-col p-4">
                  <label htmlFor="branchPhone" className="mx-2">
                    SĐT đại lý đăng ký
                  </label>
                  <Field
                    id="branchPhone"
                    name="branchPhone"
                    type="tel"
                    required
                    className="bg-light-green rounded-lg p-2 mx-2 h-8"
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
                  <div className="grid grid-cols-5">
                    <div className="col-span-2">
                      <div className="flex flex-col p-4">
                        <label htmlFor="customerName" className="mx-2">
                          Tên khách hàng
                        </label>
                        <Field
                          id="customerName"
                          name="customerName"
                          required
                          className="form-input bg-light-green rounded-lg p-2 mx-2 h-8"
                        />
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="flex flex-col p-4">
                        <label htmlFor="customerPhone" className="mx-2">
                          SĐT khách hàng
                        </label>
                        <Field
                          id="customerPhone"
                          name="customerPhone"
                          type="tel"
                          required
                          className="form-input bg-light-green rounded-lg p-2 mx-2 h-8"
                        />
                      </div>
                    </div>
                  </div>
                  <span className="font-bold mx-6">A. Địa chỉ mua hàng</span>
                  <div className="grid grid-cols-5">
                    <div className="col-span-2">
                      <div className="flex flex-col p-4">
                        <label htmlFor="customerProvince" className="mx-2">
                          Tỉnh/ Thành phố
                        </label>
                        <Field
                          id="customerProvince"
                          name="customerProvince"
                          type="select"
                          required
                          className="form-input bg-light-green rounded-lg p-2 mx-2 h-8"
                        />
                      </div>
                    </div>

                    <div className="col-span-3">
                      <div className="flex flex-col p-4">
                        <label htmlFor="customerAddress" className="mx-2">
                          Địa chỉ cụ thể
                        </label>
                        <Field
                          id="customerAddress"
                          name="customerAddress"
                          type="select"
                          required
                          className="form-input bg-light-green rounded-lg p-2 mx-2 h-8"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Model */}
                  <span className="font-bold mx-6">B. Model</span>
                  <div className="grid grid-cols-5">
                    <div className="col-span-2">
                      <div className="flex flex-col p-4">
                        <label htmlFor="model" className="mx-2">
                          Model
                        </label>
                        <Field
                          id="model"
                          name="model"
                          type="select"
                          required
                          className="form-input bg-light-green rounded-lg p-2 mx-2 h-8"
                        />
                      </div>
                    </div>

                    <div className="col-span-3">
                      <div className="flex flex-col p-4">
                        <label htmlFor="installDate" className="mx-2">
                          Thời gian lắp đặt
                        </label>
                        <Field
                          id="installDate"
                          name="installDate"
                          type="date"
                          required
                          className="form-input bg-light-green rounded-lg p-2 mx-2 h-8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </>
  )
}
