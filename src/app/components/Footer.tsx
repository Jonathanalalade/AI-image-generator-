import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full py-20 bg-white relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
        <h2 className="text-6xl font-semibold mb-8 text-gray-800">Get In Touch</h2>
        <p className="text-gray-400 max-w-3xl text-xl mb-12">
          Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        <Link 
          href="mailto:hello@jonathanalalade.com" 
          className="px-8 py-4 bg-gray-800 text-white rounded-lg text-lg transition-all duration-300 border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] hover:border-purple-400 hover:-translate-y-1 hover:-translate-x-1 hover:bg-[#B771E5]/40 transform"
        >
          Say Hello
        </Link>
        <p className="text-gray-400 mt-32">
          Designed & Built by Jonathan Alalade
        </p>
      </div>
    </footer>
  )
}

export default Footer 