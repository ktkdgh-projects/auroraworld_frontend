'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/loginModal';
import CreateWebLinkModal from '@/components/createWebLinkModal';
import { logout } from '@/api';
import '@/styles/weblink.css';

interface WebLink {
    id: number;
    title: string;
    url: string;
    category: string;
    isShared: boolean;
    imageUrl?: string; // 이미지 URL 추가
}

const categoryMap: { [key: string]: string } = {
    favorites: '개인즐겨찾기',
    work: '업무 활용자료',
    reference: '참고자료',
    education: '교육 및 학습자료',
    shared: '공유',
};

const WebLinkPage = () => {
    const [isAuthChecked, setIsAuthChecked] = useState<boolean | null>(null);
    const [webLinks, setWebLinks] = useState<WebLink[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [showModal, setShowModal] = useState(false); // 로그인 모달 상태
    const [showCreateModal, setShowCreateModal] = useState(false); // 생성 모달 상태

    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const isLoggedIn = !!localStorage.getItem('accessToken');
            setIsAuthChecked(isLoggedIn);

            if (isLoggedIn) {
                const mockData: WebLink[] = Array.from({ length: 20 }, (_, index) => ({
                    id: index + 1,
                    title: `WebLink Title ${index + 1}`,
                    url: `https://www.naver.com/`,
                    category: ['favorites', 'work', 'reference', 'education', 'shared'][index % 5],
                    isShared: index % 2 === 0,
                    imageUrl: `https://via.placeholder.com/150?text=Image+${index + 1}`, // 임시 이미지 URL 추가
                }));
                setWebLinks(mockData);
            } else {
                setShowModal(true);
            }
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        await logout();
        window.location.href = '/';
    };

    const handleCreateClick = () => {
        setShowCreateModal(true);
    };

    const handleShare = (id: number) => {
        // 공유 처리 함수 구현
        console.log(`Sharing web link with id: ${id}`);
    };

    const handleEdit = (id: number) => {
        // 수정 처리 함수 구현
        console.log(`Editing web link with id: ${id}`);
    };

    const handleDelete = (id: number) => {
        // 삭제 처리 함수 구현
        console.log(`Deleting web link with id: ${id}`);
    };

    if (isAuthChecked === false && showModal) {
        return (
            <LoginModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    router.push('/');
                }}
            />
        );
    }

    return (
        <div className="container">
            <header className="header">
                <button className="createButton" onClick={handleCreateClick}>
                    생성
                </button>
                <button className="logoutButton" onClick={handleLogout}>
                    로그아웃
                </button>
            </header>

            <div className="searchContainer">
                <input
                    type="text"
                    placeholder="웹링크 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="searchInput"
                />
            </div>

            <div className="categoryButtons">
                {['all', 'favorites', 'work', 'reference', 'education', 'shared'].map((category) => (
                    <button key={category} onClick={() => setSelectedCategory(category)} className="categoryButton">
                        {category === 'all' ? '전체' : categoryMap[category]}
                    </button>
                ))}
            </div>
            <main className="main">
                {webLinks.map((link) => (
                    <div key={link.id} className="card">
                        <div className="image-container">
                            <img
                                src={link.imageUrl}
                                alt={link.title}
                                className="web-link-image"
                                onClick={() => window.open(link.url, '_blank')} 
                            />
                        </div>

                        <div className="link-info">
                            <div className="title-category">
                                <h3>{link.title}</h3>
                                <p className="category">{categoryMap[link.category]}</p>
                            </div>

                            <div className="button-group">
                                <span className={`shared-badge ${link.isShared ? 'shared' : 'not-shared'}`}>공유</span>
                                <button className="card-share-button" onClick={() => handleShare(link.id)}>
                                    공유
                                </button>
                                <button className="card-edit-button" onClick={() => handleEdit(link.id)}>
                                    수정
                                </button>
                                <button className="card-delete-button" onClick={() => handleDelete(link.id)}>
                                    삭제
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </main>

            {showCreateModal && <CreateWebLinkModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />}
        </div>
    );
};

export default WebLinkPage;
