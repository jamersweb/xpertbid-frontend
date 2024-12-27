// pages/favorites.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteItem from '../components/FavoriteItem';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import Header from '../components/Header';
import Footer from '../components/Footer';
const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userToken = session?.user?.token; // Assumes token is part of session data
  const router = useRouter();

  // Check if user is authenticated
  // useEffect(() => {
  //   if (!userToken) {
  //     router.push('/'); // Redirect to login if not authenticated
  //   }
  // }, [router]);

  // Fetch favorite items from the API
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!userToken) {
          return;
        }
        const response = await axios.get('https://violet-meerkat-830212.hostingersite.com/public/api/favorites', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error('Error fetching favorite items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const checkFavorites = async () => {
      try {
        if (!userToken) {
          return;
        }
        const response = await axios.get('https://violet-meerkat-830212.hostingersite.com/public/api/favorites', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        console.log(response);
        setFavorites(response.data.favorites);
      }  finally {
        setLoading(false);
      }
    };

    checkFavorites();
  }, []);
  checkFavorites();

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  return (
    <>
    <Header />
    <section className="marketplace">
      <div className="container-fluid">
        <div className="fav-like-hdig">
          <h2>My Favorites</h2>
        </div>
        {favorites.length > 0 ? (
          <div className="row makt-parent">
            {favorites.map((item) => (
              <FavoriteItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p>You have no favorite items.</p>
        )}
      </div>
    </section>
    <Footer />
    </>
  );
};

export default FavoritesPage;
