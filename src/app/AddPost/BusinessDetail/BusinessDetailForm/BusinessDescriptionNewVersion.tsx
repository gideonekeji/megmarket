import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { updateAddPostData } from '@/app/storeApp/Slice/AddPostSlice';
import useTranslation from '@/app/hooks/useTranslation';

function BusinessDescriptionNewVersion() {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillInstance = useRef<any>(null);
    const [isQuillReady, setIsQuillReady] = useState(false);

    const dispatch = useAppDispatch();
    const service_description = useAppSelector(
        (state) => state.AddPost.service_description
    );

    // Load Quill CSS
    useEffect(() => {
        const quillCSS = document.createElement('link');
        quillCSS.rel = 'stylesheet';
        quillCSS.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css';
        document.head.appendChild(quillCSS);
    }, []);

    // Load Quill JS dynamically
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js';
        script.onload = () => setIsQuillReady(true);
        document.body.appendChild(script);
    }, []);

    // Initialize Quill once it's ready
    useEffect(() => {
        if (isQuillReady && window.Quill && editorRef.current) {
            quillInstance.current = new window.Quill(editorRef.current, {
                theme: 'snow',
                placeholder: 'Write your service description here...',
            });

            // Set initial content from Redux state
            if (service_description) {
                quillInstance.current.clipboard.dangerouslyPasteHTML(service_description);
            }

            // Listen to text changes
            quillInstance.current.on('text-change', () => {
                const html = editorRef.current?.querySelector('.ql-editor')?.innerHTML || '';
                dispatch(updateAddPostData({ service_description: html }));
            });
        }
    }, [isQuillReady]);

    const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
    const { getTranslation } = useTranslation();

    return (
        <div className="my-4  flex flex-col gap-[6px] font-poppins overflow-hidden">
            <label
                className={`text-B4  ${isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
                    }`}
                htmlFor="service_description"
            >
                {getTranslation("Business Description", "Business Description")}
            <span className="text-[#F21818] pl-[1px]">*</span>
            </label>
            <div
                ref={editorRef}

            />
        </div>
    );
}

export default BusinessDescriptionNewVersion;
