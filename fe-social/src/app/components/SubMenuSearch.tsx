"use client";

import React, { useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import Image from "next/image";
import Link from "next/link";

interface SubMenuSearchProps {
  onClose: () => void;
}

const SubMenuSearch: React.FC<SubMenuSearchProps> = ({ onClose }) => {
  const { allUsers, filteredUsers, isLoading, error, getAllUsers, searchUsers } = useUser();
  const [query, setQuery] = useState<string>("");

  // Загружаем пользователей только при первом рендере компонента
  useEffect(() => {
    if (allUsers.length === 0) {
      getAllUsers(); 
    }
  }, [allUsers, getAllUsers]);

  // Фильтрация пользователей на основе ввода
  useEffect(() => {
    searchUsers(query);
  }, [query, searchUsers]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".submenu-search")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Обработчик ввода в поле поиска
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // Обработчик очистки поля
  const handleClearInput = () => {
    setQuery("");
  };

  // Обработчик клика по пользователю, чтобы закрыть сабменю
  const handleUserClick = () => {
    onClose();
  };

  return (
    <div className="submenu-search absolute left-[244px] top-0 h-full w-[395px] bg-color-light rounded-tr-[16px] rounded-br-[16px]">
      <div className="px-[16px] py-[24px] ">
        <h2>Search</h2>
        <div className="relative my-[40px]">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search"
            className="w-full px-[16px] py-[8px] rounded-[12px] bg-color-light-gray placeholder:text-color-dark-gray"
          />
          {query && (
            <button
              onClick={handleClearInput}
              className="absolute right-[10px] top-1/2 transform -translate-y-1/2 h-[20px] w-[20px] rounded-full text-color-dark-gray flex items-center justify-center"
            >
              &times;
            </button>
          )}
        </div>
        <h3 className="">Recent</h3>
        <div className="mt-2">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <ul>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <li
                    key={user._id}
                    className="py-[8px] border-b-[1px] border-color-gray flex items-center space-x-[12px]"
                  >
                    <div className="relative w-[36px] h-[36px]">
                      <Image
                        src={user.profile_image || "/default-avatar.png"}
                        alt="Profile Avatar"
                        width={36}
                        height={36}
                        className="absolute inset-0 w-[30px] h-[30px] m-auto border bg-color-gray rounded-full"
                      />
                    </div>
                    {/* Добавляем обработчик клика для закрытия сабменю */}
                    <Link href={`/other-profile/${user._id}`} onClick={handleUserClick}>
                      <span className="hover:text-color-dark hover:font-semibold transition-all">
                        {user.username}
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <li>No users found</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubMenuSearch;
