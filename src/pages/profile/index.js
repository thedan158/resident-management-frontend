import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAPIActionJSON, getStatelessAPI } from '../../api/ApiActions'
import { firebaseConfig } from "../../firebase";
import firebase from "firebase/app";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "firebase/storage";
import html2canvas from 'html2canvas';

const NOT_ENOUGH_INFO = "Please answer all * required items."


const ProfilePage = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const [searchParams, setSearchParams] = useSearchParams();
    const user = searchParams.get("user")
    const isAdmin = searchParams.get("admin")
    const ref = useRef(null);
    const [apiErr, setApiErr] = useState(null)
    const [isSaved, setIsSaved] = useState(false)
    const [isFetch, setIsFetch] = useState(false)
    const [form, setForm] = useState({
        legal_name: "",
        nationality: "",
        id_type: "",
        id_number: "",
        date_of_birth: {
            day: "",
            month: "",
            year: ""
        },
        image_path: "https://firebasestorage.googleapis.com/v0/b/sugarcare-9f6bd.appspot.com/o/images%2Fprofile%2Fimages.png?alt=media&token=865ecbea-522d-4de2-8690-fc9db88991f9",
        phone: "",
        address: {
            flat_number: "",
            floor: "",
            building_name: "",
            street_number: "",
            street_name: "",
            city: "",
            state: "",
            country: "",
            zip_code: "",
        }
    })
    const [imgDataFront, setImgDataFront] = useState(null);
    const onClickInput = useRef(null)
    const username = useSelector(state => state.user.username)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const checkValidation = () => {
        if (!form.legal_name ||
            !form.nationality ||
            !form.id_number ||
            !form.id_type ||
            !form.date_of_birth.day ||
            !form.date_of_birth.month ||
            !form.date_of_birth.year ||
            !form.phone ||
            !form.address.street_name ||
            !form.address.city ||
            !form.address.country ||
            !form.address.zip_code) {
            return false;
        }
        return true;
    }
    const uploadFileToFirebase = async (file) => {
        try {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(file.name);
            const snapshot = await fileRef.put(file);
            const url = await snapshot.ref.getDownloadURL();
            return url
        } catch (error) {
            console.error(error);
        }
    };
    const handleResponse = (response) => {
        if (!response.success) {
            setApiErr(response.message)
        } else
            setIsSaved(true)
    }
    const handlePDF = async () => {
        const inputValues = {};

        document.querySelectorAll("input").forEach(input => {
            inputValues[input.name] = input.value;
        });
        const input = document.getElementById('kycA1');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                pdf.save("download.pdf");
            })
            ;
    };
    const handleSave = async () => {
        setIsSaved(false)
        setApiErr(null)
        const success = checkValidation()
        if (success) {
            dispatch({ type: "api.loading" });
            const url = await uploadFileToFirebase(imgDataFront)
            dispatch(getAPIActionJSON('updateUser', { ...form, image_path: url }, null, null, (e) => handleResponse(e), username))
        } else {
            setApiErr(NOT_ENOUGH_INFO)
        }
    }
    const fetchProfile = async () => {
        if (!user) {
            const res = await getStatelessAPI('getUser', null, null, null, username)
            if (res.data.legal_name) {
                setForm(res.data)
            }
        } else {
            const res = await getStatelessAPI('getUser', null, null, null, user)
            if (res.data.legal_name) {
                setForm(res.data)
            }
        }
        setIsFetch(true)
    }
    const onSelectFront = (e) => {
        if (e.target.files[0]) {
            setImgDataFront(e.target.files[0])
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setForm({ ...form, image_path: reader.result });
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    useEffect(() => {
        fetchProfile()
    }, [])
    return (
        <div class="body kyc kycA1" id="kycA1">
            {isFetch && <div class="home-row">
                <div class="kyc-row kyc-head">
                    <div onClick={() => console.log(form)} class="ps-title">Your profile</div>
                </div>
                <div class="kyc-row" style={{ alignItems: 'center' }}>
                    <img style={{ borderRadius: 20, width: 160, height: 160, margin: 10 }} src={form.image_path} />
                    <a onClick={() => {
                        onClickInput.current.click();
                    }} class="fi-btn">UPDATE YOUR AVATAR
                        <input
                            ref={onClickInput}
                            onChange={onSelectFront}
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                        />
                    </a>

                </div>
                <div class="kyc-row">
                    <div class="form-row">
                        <div class="fr-input fi-col3" id="legalName">
                            <div class="fi-label fi-must">Legal Name</div>
                            <input
                                class="fi-input"
                                placeholder="Your full name on legal documents"
                                value={form.legal_name}
                                onChange={(e) => setForm({ ...form, legal_name: e.target.value })} />
                        </div>
                        <div class="fr-input fi-col3" id="Natl">
                            <div class="fi-label fi-must">Nationality</div>
                            <input class="fi-input" placeholder="Your nationality"
                                value={form.nationality}
                                onChange={(e) => setForm({ ...form, nationality: e.target.value })} />

                        </div>
                    </div>
                </div>

                <div class="kyc-row">
                    <div class="form-row">
                        <div class="fr-input fi-col3" id="idType">
                            <div class="fi-label fi-must">Type of Photo ID</div>
                            <div class="fi-list">
                                <div class="fl-ans">
                                    <input class="fi-input" placeholder="Select the type of photo ID" value={form.id_type} />
                                </div>
                                <div class="fl-droplist fl-id">
                                    <div class="dl-item" onClick={() => setForm({ ...form, id_type: "ID Card" })}>
                                        <div class="dl-value">ID Card</div>
                                    </div>
                                    <div class="dl-item" onClick={() => setForm({ ...form, id_type: "Passport" })}>
                                        <div class="dl-value">Passport</div>
                                    </div>
                                    <div class="dl-item" onClick={() => setForm({ ...form, id_type: "Driver's License" })}>
                                        <div class="dl-value">Driver's License</div>
                                    </div>
                                    <div class="dl-item" onClick={() => setForm({ ...form, id_type: "Residence Permit" })}>
                                        <div class="dl-value">Residence Permit</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="fr-input fi-col3" id="idPass">
                            <div class="fi-label fi-must">Photo ID No.</div>
                            <input class="fi-input" placeholder="Your photo ID's number"
                                value={form.id_number}
                                onChange={(e) => setForm({ ...form, id_number: e.target.value })} />
                        </div>
                    </div>
                </div>

                <div class="kyc-row">
                    <div class="form-row">
                        <div class="fr-input fi-col3" id="dob">
                            <div class="fi-label fi-must">Date of Birth (Day/Month/Year)</div>
                            <div class="form-row dob-input">
                                <input class="fi-input" placeholder="DD"
                                    value={form.date_of_birth.day}
                                    onChange={(e) => setForm({ ...form, date_of_birth: { ...form.date_of_birth, day: e.target.value } })} />
                                <input class="fi-input" placeholder="MM"
                                    value={form.date_of_birth.month}
                                    onChange={(e) => setForm({ ...form, date_of_birth: { ...form.date_of_birth, month: e.target.value } })} />
                                <input class="fi-input" placeholder="YYYY"
                                    value={form.date_of_birth.year}
                                    onChange={(e) => setForm({ ...form, date_of_birth: { ...form.date_of_birth, year: e.target.value } })} />
                                <span class="fi-icon fi-calendar"></span>
                            </div>
                        </div>
                        <div class="fr-input fi-col3" id="smsPhone">
                            <div class="fi-label fi-must">Phone Number</div>
                            <div class="form-row">
                                <input class="fi-input" placeholder="Your SMS-enabled Phone number"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                            </div>
                        </div>

                    </div>
                </div>


                <div class="kyc-row">
                    <div class="form-row">
                        <div class="fr-input" id="resAdd">
                            <div class="fi-label fi-must">Residential Address</div>
                            <div class="fi-address multi-row">
                                <div class="form-row">
                                    <div class="fr-input fi-col1" id="resAddFlatNo">
                                        <div class="fi-label fi-label2">Flat No</div>
                                        <input
                                            class="fi-input"
                                            value={form.address.flat_number}
                                            onChange={(e) => setForm({ ...form, address: { ...form.address, flat_number: e.target.value } })} />
                                    </div>
                                    <div class="fr-input fi-col1" id="resAddFloor">
                                        <div class="fi-label fi-label2">Floor</div>
                                        <input class="fi-input"
                                            value={form.address.floor}
                                            onChange={(e) => setForm({ ...form, address: { ...form.address, floor: e.target.value } })} />
                                    </div>
                                    <div class="fr-input fi-col4" id="resAddBuilding">
                                        <div class="fi-label fi-label2">Building Name</div>
                                        <input class="fi-input"
                                            value={form.address.building_name}
                                            onChange={(e) => setForm({ ...form, address: { ...form.address, building_name: e.target.value } })} />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="fr-input fi-col1" id="resAddStNo">
                                        <div class="fi-label fi-label2 fi-must">Street No</div>
                                        <input class="fi-input"
                                            value={form.address.street_number}
                                            onChange={(e) => setForm({ ...form, address: { ...form.address, street_number: e.target.value } })} />
                                    </div>
                                    <div class="fr-input fi-col5" id="resAddStName">
                                        <div class="fi-label fi-label2 fi-must">Street Name</div>
                                        <input class="fi-input"
                                            value={form.address.street_name}
                                            onChange={(e) => setForm({ ...form, address: { ...form.address, street_name: e.target.value } })} />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="fr-input fi-col3" id="resCity">
                                        <div class="fi-label fi-label2 fi-must">City</div>
                                        <input class="fi-input"
                                            value={form.address.city}
                                            onChange={(e) => setForm({ ...form, address: { ...form.address, city: e.target.value } })} />
                                    </div>
                                    <div class="fr-input fi-col3" id="resAddState">
                                        <div class="fi-label fi-label2">State / Province / County</div>
                                        <input class="fi-input"
                                            value={form.address.state}
                                            onChange={(e) => setForm({ ...form, address: { ...form.address, state: e.target.value } })} />
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="fr-input fi-col3" id="resAddCountry">
                                        <div class="fi-label fi-label2 fi-must">Country/Region</div>
                                        <input class="fi-input" placeholder="Country/Region you are currently living in"
                                            value={form.address.country}
                                            onChange={(e) => setForm({ ...form, address: { ...form.address, country: e.target.value } })} />
                                    </div>
                                    <div class="fr-input fi-col3" id="resAddZip">
                                        <div class="fi-label fi-label2 fi-must">Postal / Zip Code</div>
                                        <input class="fi-input"
                                            value={form.address.zip_code}
                                            onChange={(e) => setForm({ ...form, address: { ...form.address, zip_code: e.target.value } })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="kyc-row fr-msg">
                    {apiErr && <div class="fr-err"><p>{apiErr}</p></div>}
                    <div class={isSaved ? "fr-ok" : "fr-ok hide"}><p>Your profile is saved.</p></div>
                </div>


                {!user && <div class="kyc-row">
                    <div class="form-row fr-nav">
                        <div class="fn-col">
                            <a class="fr-btn fr-back" id="btn-kyc00" onClick={() => navigate("/dashboard")}>BACK</a>
                        </div>
                        <div class="fn-col">
                            <a onClick={handleSave} class="fr-btn fr-save" id="btnSave">SAVE</a>
                        </div>
                    </div>
                </div>}

                {isAdmin && <div class="kyc-row">
                    <div class="form-row fr-nav">
                        <div class="fn-col">
                            <a class="fr-btn fr-back" id="btn-kyc00" onClick={() => navigate("/dashboard")}>BACK</a>
                        </div>
                        <div class="fn-col">
                            <a onClick={handlePDF} class="fr-btn fr-save" id="btnSave">EXPORT PDF</a>
                        </div>
                    </div>
                </div>}

            </div>}
        </div>

    )
}

export default ProfilePage