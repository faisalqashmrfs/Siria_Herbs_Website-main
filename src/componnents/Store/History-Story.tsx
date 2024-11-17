import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History-Story.css';
import TitleSection from '../TitleSection/TitleSection';

const Store: React.FC = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/stories');
        setStories(response.data.data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="IB_store HJ_MarginSection">
      
      <TitleSection title_section="  تاريخ وقصة سيريا لمنتجات الطبيعة" className='HJ_DirectionRight' />

      {stories.map((story: any, index: number) => (
        <MediaSection
          key={story.id}
          file={story.file}
          text={<HighlightedText text={story.description} />}
          reverse={index % 2 === 0}
        />
      ))}
    </div>
  );
};

interface MediaSectionProps {
  file: string;
  text: React.ReactNode;
  reverse?: boolean;
}

const MediaSection: React.FC<MediaSectionProps> = ({ file, text, reverse }) => {
  const renderMedia = (file: string) => {
    const fileExtension = file.split('.').pop()?.toLowerCase();

    switch (fileExtension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <img src={file} alt="section" className="IB_section-image" />;
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'webm':
        return (
          <video controls className="IB_section-video" controlsList="nodownload">
            <source src={file} type={`video/${fileExtension}`} />
          </video>
        );
      default:
        return null;
    }
  };

  return (
    <div className="IB_section"  >
      <div  className={`HJ_container_Store  ${reverse ? 'reverse Margin' : ''}`}>
        {renderMedia(file)}
        <div className="IB_section-text">
          {text}
        </div>

      </div>

    </div>
  );
};

interface HighlightedTextProps {
  text: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text }) => {
  const parts = text.split(',');
  return (
    <p>
      <span className="IB_highlight">{parts[0]}</span> {parts.slice(1).join(' ')}
    </p>
  );
};

export default Store;