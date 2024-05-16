import { useState } from "react";
import DefaultLayout from "../../layout/default/DefaultLayout";
import Toast, { notifyError, notifySuccess } from "../../../../components/toast/Toast";
import { api } from "../../../../api";
import axios from "axios";
import { Link } from "react-router-dom";

function AddPayment() {
    const [name, setName] = useState('');
    const [apiKey, setAPIKey] = useState('');
    const [apiSecret, setAPISecret] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [urlAPI, setUrlAPI] = useState('');
    const [webUrl, setWebUrl] = useState('');
    const [desc, setDesc] = useState('');
    const [isbank, setIsBank] = useState(true);
    const [status, setStatus] = useState(true);
    const [token,setToken] = useState(() => {
      const data = localStorage.getItem('token');
      return data ? data : '';
    });
    const headers = {
      token: `Bearer ${token}`,
      };

    const payment =
        {
            name: name,
            apiKey: apiKey,
            apiSecret: apiSecret,
            imageUrl: imageUrl,
            urlAPI: urlAPI,
            webUrl: webUrl,
            desc: desc,
            isbank: isbank,
            status: status,
          }

    const clearInput = () =>{
        setName('');
        setAPIKey('');
        setAPISecret('');
        setImageUrl('');
        setUrlAPI('');
        setWebUrl('');
        setDesc('');
        setIsBank(true);
        setStatus(true);
    }
    const handleAddPayment =  async(e) =>{
        e.preventDefault();
        if(!name ||!apiKey ||!apiSecret ||!imageUrl ||!webUrl ||!desc ||!urlAPI){
            notifyError("Thông tin không được để trống!");
          } else {
            console.log(payment);
            await axios.post(api +'/payment', payment, { headers })
            .then(response => {
                notifySuccess("Thêm thành công!");
                setTimeout(function() {
                    clearInput();
                    }, 2000);
            })
            .catch(error => {
            console.log(error);
            notifyError("Đã có lỗi xảy ra. Hãy kiểm tra và thử lại!")
            });
        }
    }

    return ( 
        <DefaultLayout>
        <div className="container-fluid pt-4 px-4">
            <div className="row">
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 id="titleTable" className="card-title text-dark upcase">Sửa Hình Thức Thanh Toán</h4>
                    <p className="card-description"> Sửa hình thức thanh toán của bạn.</p>
                    <form onSubmit={handleAddPayment} className="forms-sample">
                    <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                          <label htmlFor="inputName">Tên hình thức</label>
                            <div className="col-sm-9">
                              <input 
                              type="text" 
                              id="inputName" 
                              value={name}
                              className="form-control" 
                              onChange={(e)=>setName(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label htmlFor="inputCategory">Loại Thanh Toán</label>
                            <div className="col-sm-9">
                                <select className="form-control" id="inputCategory" 
                                onChange={(e) =>{
                                e.target.value === "1" ? setIsBank(true) : setIsBank(false)
                                }}
                                value={isbank ? '1' : '2'}
                                >
                                <option value="1">Ngân hàng</option>
                                <option value="2">Ví điện tử</option>
                                </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                          <label htmlFor="inputPhone">API Key</label>
                            <div className="col-sm-9">
                              <input 
                              type="text" 
                              id="inputPhone" 
                              value={apiKey}
                              className="form-control" 
                              onChange={(e)=>setAPIKey(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                          <label htmlFor="inputWebUrl">API Secret</label>
                            <div className="col-sm-9">
                              <input 
                              type="text" 
                              id="inputWebUrl" 
                              value={apiSecret}
                              className="form-control" 
                              onChange={(e)=>setAPISecret(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                          <label htmlFor="inputUrlApi">URL API</label>
                            <div className="col-sm-9">
                              <input 
                              type="text" 
                              id="inputUrlApi" 
                              value={urlAPI}
                              className="form-control" 
                              onChange={(e)=>setUrlAPI(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                          <label htmlFor="inputWebUrl">Website URL</label>
                            <div className="col-sm-9">
                              <input 
                              type="text" 
                              id="inputWebUrl" 
                              value={webUrl}
                              className="form-control" 
                              onChange={(e)=>setWebUrl(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                          <label htmlFor="inputImage">Logo Thanh Toán</label>
                            <div className="col-sm-9">
                              <img src={imageUrl} alt='LogoImage' style={{width: '300px'}}/>
                              <input 
                              type="text" 
                              id="inputImage" 
                              value={imageUrl}
                              className="form-control mt-2" 
                              onChange={(e)=>setImageUrl(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group row">
                          <label htmlFor="inputStatus">Hiển Thị</label>
                            <div className="col-sm-9">
                            <button id='inputStatus' className={`toggle-btn ${status ? "active" : ""}`} 
                            onClick={(e) => {e.preventDefault(); setStatus(!status);}}>
                                <div className="slider"></div>
                            </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group row">
                          <label htmlFor="inputAddress">Mô tả ngắn</label>
                            <div className="col-sm-9">
                              <textarea
                              type="text" 
                              id="inputAddress" 
                              value={desc}
                              className="form-control" 
                              onChange={(e)=>setDesc(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="action-form">
                          <button type="submit" className="btn btn-success">Thêm mới</button>
                          <Link to='/admin/payment' className="btn btn-light">Cancel</Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <Toast/>
        </DefaultLayout>
     );
}

export default AddPayment;