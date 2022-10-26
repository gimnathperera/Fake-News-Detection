import React, { useState } from 'react';
import tw from 'twin.macro';

import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import Header from 'components/headers/light';
import InputSection from 'components/features/InputSection.js';
import Footer from 'components/footers/FiveColumnWithInputForm.js';
import PredictionScreen from 'components/prediction-screen/PredictionScreen';
import ModalComponent from 'components/modal/ModalComponent';

export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  const imageCss = tw`rounded-4xl`;

  const [isOpen, setIsOpen] = useState(false);
  const [predictionData, setPredictionData] = useState({});
  const [newsHeader, setNewsHeader] = useState('');

  const handleOnComplete = (data, title) => {
    setNewsHeader(title);
    setPredictionData(data);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimationRevealPage>
      <Header />

      <InputSection
        subheading={<Subheading>Travel Recommender</Subheading>}
        heading={
          <>
            Need To Find <HighlightedText>Truth ?</HighlightedText>
          </>
        }
        statistics={[
          {
            key: 'Suggested Hotel',
            value: 'Lanchid 19',
          },
          {
            key: 'Weather',
            value: 'Cloudy',
          },
          {
            key: 'Temperature',
            value: '24°C',
          },
          {
            key: 'Humidity',
            value: '86%',
          },
        ]}
        primaryButtonText="Submit"
        primaryButtonUrl="https://order.now.com"
        imageInsideDiv={false}
        imageSrc="https://images.pexels.com/photos/941555/pexels-photo-941555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
        onComplete={handleOnComplete}
      />

      <ModalComponent
        isOpen={isOpen}
        modalContent={
          <PredictionScreen
            onClose={handleModalClose}
            similarity={predictionData?.similarity}
            newsHeader={newsHeader}
          />
        }
        handleClose={handleModalClose}
        showCloseIcon={false}
      />

      <Footer />
    </AnimationRevealPage>
  );
};
