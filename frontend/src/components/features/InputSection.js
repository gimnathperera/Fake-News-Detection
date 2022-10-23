import React, { useState } from 'react';
import axios from 'axios';
import tw from 'twin.macro';
import styled from 'styled-components';
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from 'components/misc/Headings.js';
import { PrimaryButton as PrimaryButtonBase } from 'components/misc/Buttons.js';
import StatsIllustrationSrc from 'images/stats-illustration.svg';
import { ReactComponent as SvgDotPattern } from 'images/dot-pattern.svg';
import { BASE_URL } from 'constants/index.js';

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto relative`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Input = tw.textarea`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-2 placeholder-gray-500 text-sm focus:outline-none focus:border-blue-700 focus:bg-white mt-5 first:mt-0`;

const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-6 md:mt-8 text-sm inline-block mx-auto md:mx-0`;

const DecoratorBlob = styled(SvgDotPattern)((props) => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`,
]);

export default ({
  subheading = 'Our Track Record',
  heading = (
    <>
      We have been doing this <wbr /> since{' '}
      <span tw="text-primary-500">1999.</span>
    </>
  ),
  description = "Must we have evidence to know the truth? But you can't decide where? Don't worry. Just type in your news, will tell you the truth.",
  primaryButtonText = 'Learn More',
  primaryButtonUrl = 'https://timerse.com',
  imageSrc = StatsIllustrationSrc,
  imageCss = null,
  imageContainerCss = null,
  imageDecoratorBlob = false,
  imageDecoratorBlobCss = null,
  imageInsideDiv = true,
  statistics = null,
  textOnLeft = false,
  onComplete,
}) => {
  const defaultStatistics = [
    {
      key: 'Clients',
      value: '2282+',
    },
    {
      key: 'Projects',
      value: '3891+',
    },
    {
      key: 'Awards',
      value: '1000+',
    },
  ];

  if (!statistics) statistics = defaultStatistics;

  const [vacationText, setVacationText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (vacationText) {
        setIsLoading(true);
        const data = JSON.stringify({
          description: vacationText,
        });

        const config = {
          method: 'post',
          url: `${BASE_URL}/predict`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };

        const result = await axios(config);
        onComplete(result.data);
        setIsLoading(false);
      } else {
      }
    } catch (err) {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <TwoColumn css={!imageInsideDiv && tw`md:items-center`}>
        <ImageColumn css={imageContainerCss}>
          {imageInsideDiv ? (
            <Image imageSrc={imageSrc} css={imageCss} />
          ) : (
            <img src={imageSrc} css={imageCss} alt="" />
          )}
          {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            <Input
              type="text"
              placeholder="Add your news header..."
              onChange={(e) => setVacationText(e.target.value)}
              value={vacationText}
            />
            <Input
              type="text"
              placeholder="Describe your news..."
              rows="8"
              onChange={(e) => setVacationText(e.target.value)}
              value={vacationText}
            />
            <PrimaryButton onClick={handleSubmit}>
              {isLoading ? (
                <div class="flex justify-center items-center">
                  <div
                    class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                primaryButtonText
              )}
            </PrimaryButton>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
