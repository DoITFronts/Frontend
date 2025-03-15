'use client';

import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

interface PlaceSearchProps {
  onPlaceSelect: (place: {
    placeName: string;
    address: string;
    city: string;
    town: string;
    latitude: string;
    longitude: string;
  }) => void;
}

interface PlaceResult {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  category_name: string;
  x: string;
  y: string;
}

const PlaceSearch: React.FC<PlaceSearchProps> = ({ onPlaceSelect }) => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 검색 결과창 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 장소 검색 함수
  const searchPlaces = async () => {
    if (!keyword.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
        params: {
          query: keyword,
          size: 10,
        },
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      });

      setResults(response.data.documents);
      setIsOpen(true);
    } catch (error) {
      console.error('장소 검색 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 장소 선택 핸들러
  const handleSelectPlace = (place: PlaceResult) => {
    const addressParts = place.address_name.split(' ');

    onPlaceSelect({
      placeName: place.place_name,
      address: place.address_name,
      city: addressParts[0] || '',
      town: addressParts[1] || '',
      latitude: place.y,
      longitude: place.x,
    });

    setKeyword(place.place_name);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="flex gap-2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="장소를 검색해주세요"
          className="w-full flex-1 rounded-[12px] bg-black-2 px-4 py-2.5 text-black-8 placeholder:text-black-6"
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && searchPlaces()}
        />
        <button
          type="button"
          onClick={searchPlaces}
          className="rounded-[12px] bg-black-10 px-4 py-2.5 text-sm text-white"
          disabled={isLoading}
        >
          {isLoading ? '검색 중' : '검색'}
        </button>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-[12px] border border-black-4 bg-white shadow-lg">
          {results.map((place) => (
            <div
              key={place.id}
              className="cursor-pointer border-b border-black-4 p-3 last:border-0 hover:bg-black-2"
              onClick={() => handleSelectPlace(place)}
            >
              <div className="font-medium">{place.place_name}</div>
              <div className="text-sm text-black-8">{place.address_name}</div>
              {place.road_address_name && (
                <div className="text-sm text-black-6">{place.road_address_name}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaceSearch;
