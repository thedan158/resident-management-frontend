import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAPIActionJSON } from '../../../api/ApiActions'

const RequestAdmin = (props) => {
    const { data } = props
    const [statusStyle, setStatusStyle] = useState("kps-item kps-need")
    const dispatch = useDispatch()
    const handleResponse = (response, status) => {
        if (!response.success) {
            return
        }
        if (status === "Unfinished") {
            setStatusStyle("kps-item kps-need")
            return
        }
        if (status === "Approved") {
            setStatusStyle("kps-item kps-ok")
            return
        }
        if (status === "Denied") {
            setStatusStyle("kps-item kps-not")
            return
        }
    }
    const handleUpdate = (status) => {
        dispatch(getAPIActionJSON('createService', {
            legalName: data.legal_name,
            idType: data.id_type,
            idNumber: data.id_number,
            publishedDate: data.published_date,
            publishedLocation: data.published_location,
            date: data.date,
            status: status
        }, null, null, (e) => handleResponse(e, status), data.userId))
    }
    useEffect(() => {
        if (data.status === "Unfinished") {
            setStatusStyle("kps-item kps-need")
            return
        }
        if (data.status === "Approved") {
            setStatusStyle("kps-item kps-ok")
            return
        }
        if (data.status === "Denied") {
            setStatusStyle("kps-item kps-not")
            return
        }
    }, [])
    if (!data) return null
    return (
        <div class="kp-row">
            <div class="kp-td kp-dtls">
                <div class="kpd-row" id="kpName">
                    <div id="kpNameFirst">{data.legal_name}</div>
                </div>
                <div class="kpd-row">
                    <div id="kpCountry">{data.date}</div>
                </div>

            </div>
            <div class="kp-td"><div class="kpd-row" id="kpRole">{data.id_type}</div></div>
            <div class="kp-td">
                <div class="kpd-row" id="kpRole">{`Num: ${data.id_number}`}</div>
                <div class="kpd-row" id="kpRole">{`Date: ${data.published_date}`}</div>
                <div class="kpd-row" id="kpRole">{`Loc: ${data.published_location}`}</div>
            </div>
            <div class="kp-td kp-live">
                <a onClick={() => handleUpdate("Denied")} style={{ margin: 5 }} class="kp-btn" id="kpId">Deny</a>
                <a onClick={() => handleUpdate("Approved")} style={{ margin: 5 }} class="kp-btn" id="kpAdd">Appove</a>
            </div>
            <div class="kp-td kp-status">
                <div class={statusStyle} id="kpLiveStatus">Approval</div>
            </div>
        </div>
    )
}

export default RequestAdmin