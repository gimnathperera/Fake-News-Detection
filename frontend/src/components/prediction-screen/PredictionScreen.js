import React, { useState } from 'react';
import tw from 'twin.macro';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from 'components/misc/Headings.js';
import { PrimaryButton as PrimaryButtonBase } from 'components/misc/Buttons.js';
import { API_KEY, NEWS_API } from 'constants/index';

const Container = tw.div`relative flex flex-col`;
const Box = tw.div`p-12 flex items-center flex-col`;
const Heading = tw(
  SectionHeading
)`mt-4 font-[#243E63] text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-6 md:mt-8 text-sm inline-block mx-auto md:mx-0`;

const PredictionScreen = ({ newsHeader, similarity }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckGoogle = async () => {
    try {
      setIsLoading(true);

      const config = {
        method: 'get',
        url: `${NEWS_API}/v2/everything?q=${newsHeader}&from=2022-09-26&sortBy=publishedAt&apiKey=${API_KEY}`,
      };

      const result = await axios(config);
      if (result?.data?.articles.length > 0) {
        toast.success('Validated by google news');
      } else {
        toast.error('No news found in google');
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Box>
        {similarity > 0.3 ? (
          <>
            <Heading>This is a real news </Heading>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              y="0"
              enableBackground="new 0 0 240.608 240.608"
              version="1.1"
              viewBox="0 0 240.608 240.608"
              xmlSpace="preserve"
            >
              <path
                fill="#020202"
                d="M208.789 29.972l31.819 31.82L91.763 210.637 0 118.876l31.819-31.82 59.944 59.942L208.789 29.972z"
              ></path>
            </svg>
          </>
        ) : (
          <>
            <Heading>This is a fake news </Heading>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0"
              y="0"
              enableBackground="new 0 0 208.891 208.891"
              version="1.1"
              viewBox="0 0 208.891 208.891"
              xmlSpace="preserve"
              style={{ padding: 15 }}
            >
              <path d="M0 170l65.555-65.555L0 38.891 38.891 0l65.555 65.555L170 0l38.891 38.891-65.555 65.555L208.891 170 170 208.891l-65.555-65.555-65.555 65.555L0 170z"></path>
            </svg>
          </>
        )}

        <PrimaryButton onClick={handleCheckGoogle}>
          <div class="flex justify-center items-center">
            <div
              class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
              role="status"
            >
              {isLoading ? (
                <span class="visually-hidden">Loading...</span>
              ) : (
                <span class="visually-hidden">Check From Google</span>
              )}
            </div>
          </div>
        </PrimaryButton>
      </Box>
    </Container>
  );
};
export default PredictionScreen;
