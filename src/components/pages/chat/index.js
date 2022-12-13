import React, { useEffect } from "react";
import "./styles.css";
import { App as SendbirdApp} from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";
import Header from '../../../components/layouts/headerTop'
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetails } from "../../../store/Actions/serviceProvider.actions";
const APP_ID = "47492D57-FE0E-42C5-8C55-CD04E25C1674";
export default function Chat(props) {
  const dispatch = useDispatch()
  const profileData = useSelector((state) => state.profileReducer)
  const { bannerDetails, profileDetails } = profileData
  useEffect(() => {
    init();
  })

  const init = async () => {
    const uniqueURL = localStorage.getItem('uniqueUrl')
    await dispatch(getProfileDetails(uniqueURL))
  }
  console.log(bannerDetails,profileData)
  const myColorSet = {
    '--sendbird-light-primary-300': '#D81159',
    '--sendbird-light-primary-100': '#DDDDDD',
    '--sendbird-font-family-default':'Open Sans'
  }
  return (
    <div className="ChatApp">
      <SendbirdApp
        appId={APP_ID}
        userId={profileDetails?.userId}
        nickname={profileDetails?.businessName}
        colorSet={myColorSet}
        profileUrl={'https://myawsbucket-swiftbel.s3.ca-central-1.amazonaws.com/test1/1649827692112i.png'}
      
     />


    </div>
  );
}