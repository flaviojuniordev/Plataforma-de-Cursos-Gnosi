import { useState, ChangeEvent, useEffect } from 'react';

interface FigureProps {
  onProfilePictureChange: (file: File) => void;
  profilePicture: string | null;
  isEditing: boolean;
}

const Figure = ({ onProfilePictureChange, profilePicture, isEditing }: FigureProps) => {
  const [localProfilePicture, setLocalProfilePicture] = useState<string | null>(profilePicture);

  useEffect(() => {
    setLocalProfilePicture(profilePicture);
  }, [profilePicture]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalProfilePicture(imageUrl);
      onProfilePictureChange(file);
    }
  };

  return (
      <div className="flex flex-col items-center mt-6 gap-4">
        <figure className="personal-figure">
          <img
              src={localProfilePicture || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-purple-500 object-cover"
          />
        </figure>
        <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
        />
        {isEditing && (
            <button
                type="button"
                onClick={() => document.getElementById('fileInput')?.click()}
                className="bg-purple-500 text-white py-1 px-3 rounded-lg hover:bg-purple-600 transition-colors self-end"
            >
              Alterar foto de perfil
            </button>
        )}
      </div>
  );
};

export default Figure;