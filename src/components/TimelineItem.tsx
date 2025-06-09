import type { TimelineItem as TimelineItemType } from '../types/Timeline';
import React from 'react';

interface TimelineItemProps {
  item: TimelineItemType;
  baseUrl: string;
  onAudioSelect: (audioUrl: string) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, baseUrl, onAudioSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100">
      {item.Image && (
        <img
          src={`${baseUrl}${item.Image.replace('\\', '/')}`}
          alt={item.Title || 'Timeline Image'}
          className="w-full h-48 p-2 rounded-xl"
          loading="lazy"
        />
      )}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-snug">
          {item.Title}
        </h3>
        {item.Description && (
          <p className="text-gray-700 text-base mb-4 flex-grow leading-relaxed">
            {item.Description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
          <div className="flex items-center">
            {item.Icon && (
              <img
                src={`${baseUrl}${item.Icon.replace('\\', '/')}`}
                alt="Icon"
                className="w-5 h-5 mr-2 rounded-full object-cover"
              />
            )}
            <span>{item.CreateDate}</span>
          </div>
          {item.Audio && (
            <button
              onClick={() => onAudioSelect(`${baseUrl}${item.Audio.replace('\\', '/')}`)}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center focus:outline-none"
              aria-label="Listen to audio"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 6.343a1 1 0 010 1.414L15.99 9.172a3 3 0 010 4.243l-1.333 1.333a1 1 0 001.414 1.414l1.333-1.333a5 5 0 000-7.07l-1.414-1.414a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Listen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem; 