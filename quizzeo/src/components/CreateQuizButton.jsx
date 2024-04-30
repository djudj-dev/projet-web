import React from "react";

const CreateQuizButton = () => {
    return (
        <>
            <button className="flex justify-between items-center bg-[#84602C] text-sm text-white px-2 py-[6px] gap-[10px]">
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.33334 10.3333H7.66668V7.66665H10.3333V6.33331H7.66668V3.66665H6.33334V6.33331H3.66668V7.66665H6.33334V10.3333ZM7.00001 13.6666C6.07779 13.6666 5.21112 13.4916 4.40001 13.1416C3.5889 12.7916 2.88334 12.3166 2.28334 11.7166C1.68334 11.1166 1.20834 10.4111 0.858344 9.59998C0.508344 8.78887 0.333344 7.9222 0.333344 6.99998C0.333344 6.07776 0.508344 5.21109 0.858344 4.39998C1.20834 3.58887 1.68334 2.88331 2.28334 2.28331C2.88334 1.68331 3.5889 1.20831 4.40001 0.858313C5.21112 0.508313 6.07779 0.333313 7.00001 0.333313C7.92223 0.333313 8.7889 0.508313 9.60001 0.858313C10.4111 1.20831 11.1167 1.68331 11.7167 2.28331C12.3167 2.88331 12.7917 3.58887 13.1417 4.39998C13.4917 5.21109 13.6667 6.07776 13.6667 6.99998C13.6667 7.9222 13.4917 8.78887 13.1417 9.59998C12.7917 10.4111 12.3167 11.1166 11.7167 11.7166C11.1167 12.3166 10.4111 12.7916 9.60001 13.1416C8.7889 13.4916 7.92223 13.6666 7.00001 13.6666ZM7.00001 12.3333C8.4889 12.3333 9.75001 11.8166 10.7833 10.7833C11.8167 9.74998 12.3333 8.48887 12.3333 6.99998C12.3333 5.51109 11.8167 4.24998 10.7833 3.21665C9.75001 2.18331 8.4889 1.66665 7.00001 1.66665C5.51112 1.66665 4.25001 2.18331 3.21668 3.21665C2.18334 4.24998 1.66668 5.51109 1.66668 6.99998C1.66668 8.48887 2.18334 9.74998 3.21668 10.7833C4.25001 11.8166 5.51112 12.3333 7.00001 12.3333Z"
                        fill="white"
                    />
                </svg>
                Créer un Quiz
            </button>
        </>
    );
};

export default CreateQuizButton;
