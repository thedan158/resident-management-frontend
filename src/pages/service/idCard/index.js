import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAPIActionJSON } from '../../../api/ApiActions'

const NOT_ENOUGH_INFO = "Please answer all * required items."

const IdCardRepublish = () => {
    const navigate = useNavigate()
    const username = useSelector(state => state.user.username)
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        legalName: "", idType: "", idNumber: "", publishedDate: "", publishedLocation: ""
    })

    const [apiErr, setApiErr] = useState(null)

    const handleResponse = (response) => {
        if (!response.success) {
            setApiErr(response.message)
        } else
            navigate("/requestStatus")
    }
    const checkValidation = () => {
        if (!form.legalName ||
            !form.idType ||
            !form.idNumber ||
            !form.publishedDate ||
            !form.publishedLocation
        ) {
            return false;
        }
        return true;
    }
    const handleSubmit = () => {
        setApiErr(null)
        const success = checkValidation()
        if (!success) {
            setApiErr(NOT_ENOUGH_INFO)
        } else
            dispatch(getAPIActionJSON('createService', form, null, null, (e) => handleResponse(e), username))
    }
    return (
        <div class="body kyc kycB1a" id="kycB1a">

            <div class="home-row">

                <div class="kyc-row kyc-head">
                    <div onClick={() => console.log(form)} class="ps-title">Infomation For Republishment</div>
                </div>
                <div class="kyc-row">
                    <div class="form-row">
                        <div class="fr-input fi-col6" id="entLegalName">
                            <div class="fi-label fi-must">Your full legal name</div>
                            <input class="fi-input" placeholder="Full name on legal documents..."
                                value={form.legalName}
                                onChange={(e) => setForm({ ...form, legalName: e.target.value })} />
                        </div>
                    </div>
                </div>
                <div class="kyc-row">
                    <div class="form-row">
                        <div class="fr-input fi-col3" id="Country">
                            <div class="fi-label fi-must">ID Document Type</div>
                            <div class="fi-list">
                                <div class="fl-ans">
                                    <input class="fi-input" placeholder="Your document type..." value={form.idType} />
                                </div>
                                <div class="fl-droplist fl-country">
                                    <div onClick={() => setForm({ ...form, idType: "ID Card" })} class="dl-item">
                                        <div class="dl-value">ID Card</div>
                                    </div>
                                    <div onClick={() => setForm({ ...form, idType: "Passport" })} class="dl-item">
                                        <div class="dl-value">Passport</div>
                                    </div>
                                    <div onClick={() => setForm({ ...form, idType: "Residence Permit" })} class="dl-item">
                                        <div class="dl-value">Residence Permit</div>
                                    </div>
                                    <div onClick={() => setForm({ ...form, idType: "Driver's License" })} class="dl-item">
                                        <div class="dl-value">Driver's License</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="fr-input fi-col3" id="entTIN">
                            <div class="fi-label fi-must">ID Number</div>
                            <input class="fi-input" placeholder="Your ID Number"
                                value={form.idNumber}
                                onChange={(e) => setForm({ ...form, idNumber: e.target.value })} />
                        </div>
                    </div>
                </div>
                <div class="kyc-row">
                    <div class="form-row">
                        <div class="fr-input fi-col6" id="entDescBiz">
                            <div class="fi-label fi-must">Previous published date</div>
                            <textarea class="fi-input" placeholder="Your previous published date..."
                                value={form.publishedDate}
                                onChange={(e) => setForm({ ...form, publishedDate: e.target.value })} ></textarea>
                        </div>
                    </div>
                </div>
                <div class="kyc-row">
                    <div class="form-row">
                        <div class="fr-input fi-col6" id="entAssetSource">
                            <div class="fi-label fi-must">Previous published location</div>
                            <textarea class="fi-input" placeholder="Your previous published location..."
                                value={form.publishedLocation}
                                onChange={(e) => setForm({ ...form, publishedLocation: e.target.value })} ></textarea>
                        </div>
                    </div>
                </div>


                <div class="kyc-row fr-msg">
                    {apiErr && <div class="fr-err"><p>{apiErr}</p></div>}
                </div>


                <div class="kyc-row">
                    <div class="form-row fr-nav">
                        <div class="fn-col">
                            <a class="fr-btn fr-back" onClick={() => navigate("/service")}>BACK</a>
                        </div>
                        <div class="fn-col">
                            <a onClick={handleSubmit} class="fr-btn fr-next" id="btn-kycB1b" href="#kycB1b">SUBMIT</a>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default IdCardRepublish