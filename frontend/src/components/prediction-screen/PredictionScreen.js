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
  const [googleNews, setGoogleNews] = useState('');

  const handleCheckGoogle = async () => {
    try {
      setIsLoading(true);

      const config = {
        method: 'get',
        url: `${NEWS_API}/v2/everything?q=${newsHeader}&from=2022-09-27&sortBy=publishedAt&apiKey=${API_KEY}`,
      };

      const result = await axios(config);
      if (result?.data?.articles.length > 0) {
        setGoogleNews(result?.data?.articles[0]?.url);
      } else {
        setGoogleNews('News is fake');
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error('Network error');
    }
  };

  const handleRedirection = (link) => {
    window.open(link, '_blank');
  };

  return (
    <Container>
      <Box>
        {similarity > 0.6 ? (
          <>
            <Heading>Similarity: {similarity}</Heading>
            {googleNews && (
              <p
                style={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  color: 'blueviolet',
                }}
                onClick={() => handleRedirection(googleNews)}
              >
                {googleNews}
              </p>
            )}
          </>
        ) : (
          <>
            <Heading>Similarity: {similarity} </Heading>
            {googleNews && (
              <p
                style={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  color: 'blueviolet',
                }}
                onClick={() => handleRedirection(googleNews)}
              >
                {googleNews}
              </p>
            )}
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
