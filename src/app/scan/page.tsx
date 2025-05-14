'use client';

import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ScanPage() {
  const webcamRef = useRef<Webcam>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Loading models...');
  const [error, setError] = useState('');
  const router = useRouter();

  // Load models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = '/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        setStatus('Models loaded. Waiting for camera...');
        setLoading(false);
      } catch (err) {
        setError('Failed to load face-api models.');
        console.error(err);
      }
    };

    loadModels();
  }, []);

  // Analyze face
  const analyzeFace = async () => {
    setStatus('Analyzing...');
    setError('');

    if (!webcamRef.current || !webcamRef.current.video) {
      setError('Camera not ready or permission denied.');
      return;
    }

    const video = webcamRef.current.video;

    try {
      const detections = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (detections) {
        const worthy = Math.random() > 0.5;
        router.push(`/result?worthy=${worthy}`);
      } else {
        setError('No face detected! Try adjusting your lighting or position.');
      }
    } catch (err) {
      console.error(err);
      setError('Error analyzing face.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white p-4">
      <h2 className="text-3xl font-bold mb-4">Face Scanning Portal</h2>

      {loading ? (
        <p className="text-gray-400">{status}</p>
      ) : (
        <>
          <Webcam
            ref={webcamRef}
            audio={false}
            width={320}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'user' }}
            onUserMedia={() => setStatus('Camera ready! Click Analyze.')}
            onUserMediaError={() => setError('Please allow camera access to continue.')}
            className="rounded-xl border border-purple-600"
          />

          <button
            onClick={analyzeFace}
            className="mt-6 bg-purple-700 hover:bg-purple-800 px-6 py-2 rounded-xl text-lg font-semibold transition-all"
          >
            Analyze Me
          </button>

          <p className="mt-4 text-sm text-gray-400">{status}</p>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </>
      )}
        <div className="fixed inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none opacity-35">
        <Image
            src="/blacksun.png"
            alt="Spinning Black Sun"
            className="w-[90vmin] opacity-10 animate-spin-slow"
            width={1440}
            height={1440}
        />
        </div>
    </div>
  );
}
