import { useEffect, useState } from 'react';

import { api } from '../services/api';

import { Button } from './Button';
export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

type SideBarProps = {
  selectedGenreId: number
  genreClikHandler: (id: number) => void
}

export function SideBar({ selectedGenreId, genreClikHandler }: SideBarProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => genreClikHandler(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

    </nav>
  )
}