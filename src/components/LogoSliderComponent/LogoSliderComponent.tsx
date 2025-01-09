"use client";
import React from "react";
import styles from "@/components/LogoSliderComponent/style.module.css";
import { useTheme } from "next-themes";
export default function LogoSliderComponent() {
  const { theme } = useTheme();
  return (
    <div className={styles.slider}>
      <div className={styles.slideTrack}>
        <div className={styles.slide}>
          <img
            src="/images/spring.png"
            alt="Spring"
            className={styles.imageSize}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="/images/laravel.png"
            alt="Laravel"
            className={styles.imageSize}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="/images/nestjs.png"
            alt="NestJS"
            className={styles.imageSize}
          />
        </div>
        <div className={styles.slide}>
          {theme === "dark" ? (
            <img
              src="/images/django-white.jpg"
              alt="Logo"
              className={styles.image}
            />
          ) : (
            <img src="/images/django.png" alt="Logo" className={styles.image} />
          )}
        </div>
        <div className={styles.slide}>
          <img
            src="/images/fastapi.png"
            alt="FastAPI"
            className={styles.imageSize}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="/images/react.png"
            alt="React"
            className={styles.imageSize}
          />
        </div>
        <div className={styles.slide}>
          <img src="/images/go.png" alt="Go" className={styles.imageSize} />
        </div>
        <div className={styles.slide}>
          <img src="/images/next.png" alt="Next" className={styles.imageSize} />
        </div>
        <div className={styles.slide}>
          <img
            src="/images/Vue.png"
            alt="Vue"
            className={styles.imageSize}
            style={{ height: '60px', width: '60px' }}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="/images/Kotlin.png"
            alt="Kotlin"
            className={styles.imageSize}
            style={{ height: '60px', width: '60px' }}
          />
        </div>
        {/* second image */}
        <div className={styles.slide}>
          <img
            src="/images/spring.png"
            alt="Spring"
            className={styles.imageSize}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="/images/laravel.png"
            alt="Laravel"
            className={styles.imageSize}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="/images/nestjs.png"
            alt="NestJS"
            className={styles.imageSize}
          />
        </div>
        <div className={styles.slide}>
          {theme === "dark" ? (
            <img
              src="/images/django-white.jpg"
              alt="Logo"
              className={styles.image}
            />
          ) : (
            <img src="/images/django.png" alt="Logo" className={styles.image} />
          )}
        </div>
        <div className={styles.slide}>
          <img
            src="/images/fastapi.png"
            alt="FastAPI"
            className={styles.imageSize}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="/images/react.png"
            alt="React"
            className={styles.imageSize}
          />
        </div>
        <div className={styles.slide}>
          <img src="/images/go.png" alt="Go" className={styles.imageSize} />
        </div>
        <div className={styles.slide}>
          <img src="/images/next.png" alt="Next" className={styles.imageSize} />
        </div>
        <div className={styles.slide}>
          <img
            src="/images/Vue.png"
            alt="Vue"
            className={styles.imageSize}
            style={{ height: '60px', width: '60px' }}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="/images/Kotlin.png"
            alt="Kotlin"
            className={styles.imageSize}
            style={{ height: '60px', width: '60px' }}
          />
        </div>
      </div>
    </div>
  );
}
