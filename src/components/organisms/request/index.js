import React, { useEffect, useState } from 'react'

const Request = (props) => {
    const { data, deleteRequest } = props
    const [statusStyle, setStatusStyle] = useState("kps-item kps-need")

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
                <a style={{ margin: 5 }} class="kp-btn" id="kpId">Edit</a>
                <a onClick={deleteRequest} style={{ margin: 5 }} class="kp-btn" id="kpAdd">Delete</a>
            </div>
            <div class="kp-td kp-status">
                <div class={statusStyle} id="kpLiveStatus">Approval</div>
            </div>
        </div>
    )
}

export default Request