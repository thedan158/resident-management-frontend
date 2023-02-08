import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function ServicePage() {
    const navigate = useNavigate()
    const [serviceType, setServiceType] = useState(null)
    const [docType, setDocType] = useState(null)
    const handleNext = () => {
        navigate('/requestStatus')
    }
    return (
        <div class="body kyc kyc00" id="kyc00">
            <div class="home-row">

                <div class="kyc-row kyc-head">
                    <div class="ps-title">GOVERNMENT SERVICES</div>
                </div>
                <div class="kyc-row">
                    <div class="ps-desc">
                        <p><b>Please indicate which service do you want to use ?</b><br />
                            The products and services available to you within our platforms shall vary based on such information.</p>
                    </div>
                    <div class="form-row fr-option">
                        <div onClick={() => setServiceType('republish')} class={serviceType === "republish" ? "fr-btn active" : "fr-btn"} id="USInvest">Documents Republish</div>
                        <a href="#puNonUS"><div class="fr-btn" id="nonUSInvest">Insurancy Services</div></a>
                    </div>
                    <div class="popup" id="puNonUS" >
                        <a href="#kyc00" class="pu-close" id="pu-close"></a>
                        <div class="pu-content">
                            <p>Thank you for your interest in ChaiinFolio.  This service is not online temporary! Please comeback later !</p>
                            <p>Thank you for your support!</p>
                        </div>
                    </div>
                </div>
                {serviceType === 'republish' && <div class="kyc-row">
                    <div class="ps-desc">
                        <p><b>Please choose which kind of document you want to republish?</b></p>
                    </div>
                    <div class="form-row fr-option">
                        <div onClick={() => setDocType('IDCard')} class={docType === "IDCard" ? "fr-btn active" : "fr-btn"} id="AccdInvest">ID Card</div>
                        <div onClick={() => setDocType('Driver')} class={docType === "Driver" ? "fr-btn active" : "fr-btn"} id="nonAccdInvest">Driver's License</div>
                    </div>
                </div>}

                <div class="kyc-row fr-msg">
                    <div class="fr-err"><p>Please answer all the questions.</p></div>
                </div>


                <div class="kyc-row">
                    <div class="form-row fr-nav">
                        <div class="fn-col">
                            <a class="fr-btn fr-back" id="btn-kyc00" onClick={() => navigate('/dashboard')}>BACK</a>
                        </div>
                        <div class="fn-col">
                            <a onClick={handleNext} class={docType !== null ? "fr-btn fr-next" : "fr-btn fr-next inactive"} id="btn-kycA1">NEXT</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}