/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
          'unsplash': "url('https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjczMDZ8MHwxfGFsbHx8fHx8fHx8fDE2NjUxMDE2NjA&ixlib=rb-1.2.1&q=80&w=1080')"
      },
      animation: {
        'dropslow': 'drop 0.1s linear 1 forwards',
        'hideslow': 'hide 0.1s linear 1 forwards',
        'background': 'flow 1s ease-in-out infinite',
        'loading': 'load 1s linear infinite'
      },
      keyframes:{
        drop: {
          '0%': {top: '-3.5rem'},
          '100%': {top: '3.5rem'}
        },
        hide: {
          '0%': {top: '3.5rem'},
          '100%': {top: '-3.5rem'}
        },
        flow: {
          '0%': {opacity: '0'},
          '50%': {opacity: '1'},
          '100%': {opacity: '0'}
        },
        load: {
          '0%': {transform: 'rotate(0deg)'},
          '100%': {transform: 'rotate(360deg)'}
        }
      }
    },
  },
  plugins: [],
}
