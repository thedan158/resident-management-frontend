import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Request from '../../../components/organisms/request'
import { getStatelessAPI } from '../../../api/ApiActions'
import { useSelector } from 'react-redux'
import RequestAdmin from '../../../components/organisms/requestAdmin'

const RequestStatus = () => {
    const username = useSelector(state => state.user.username)
    const role = useSelector(state => state.user.role)
    const [isFetch, setIsFetch] = useState(false)
    const navigate = useNavigate()
    const [listRequest, setListRequest] = useState([])
    const handleNew = () => {
        navigate("/addIDCard")
    }
    const deleteRequest = (number) => {
        console.log(number)
        const newArray = listRequest.filter((item, index) => index !== number)
        setListRequest(newArray)
    }
    const fetchData = async () => {
        const res = await getStatelessAPI('getAllService', null, null, null, role === "user" ? username : "")
        console.log(res.message)
        if (!res.message) return
        setListRequest(res.message)
        setIsFetch(true)
    }
    const renderIndividual = Array.from({ length: listRequest.length }, (_, index) => {
        if (role === "user") {
            return <Request data={listRequest[index]} deleteRequest={() => deleteRequest(index)} />;
        } else return <RequestAdmin data={listRequest[index]} />;

    });
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div class="body kyc kyc04" id="kyc04">
            <div class="home-row">

                <div class="kyc-row kyc-head">
                    <p class="ps-title">Republish Submission and Status</p>
                    <div class="ps-desc">
                        <p>You can check your submission status here while our administrator reviewing them.</p>
                    </div>
                </div>
                {isFetch ? (<div class="kyc-row kyc-status">
                    <div class="kp-tbl">
                        <div class="kp-row kp-th">
                            <div class="kp-td">Application</div>
                            <div class="kp-td">Republish Type</div>
                            <div class="kp-td">Specification</div>
                            <div class="kp-td">Options</div>
                            <div class="kp-td">Status</div>
                        </div>
                        {renderIndividual}
                    </div>
                </div>) : <p class="ps-title">Loading...</p>}
                <div class="kyc-row fr-msg">
                    <div class="fr-err"><p>You can only made one request per day. New request will replace current one on that day.</p></div>
                </div>
                <div class="kyc-row">
                    <div class="form-row fr-nav">
                        <div class="fn-col">
                            <a class="fr-btn fr-back" id="btn-kyc00" onClick={() => navigate('/service')}>BACK</a>
                        </div>
                        <div class="fn-col">
                            {role === "user" && <a onClick={handleNew} class={"fr-btn fr-next"}>CREATE NEW REQUEST</a>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RequestStatus