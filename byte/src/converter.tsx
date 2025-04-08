import React, { useState } from "react";

const Converter: React.FC = () => {
    const [text, setText]= useState<string>("");
    const [binary,setBinary] = useState<string>("");

    const convertToBinary = () => {
      
        if(text.trim().length == 0){
            setBinary(""); 
            return;
            
        }
        
        const binaryResult= text 
        .split("")
        .filter((char) => /[a-zA-Z]/.test(char))
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(" ");

        setBinary(binaryResult);
    };
    return ( 
            <div className="container"> 
            <h2>Text to Binary Converter</h2>
                <input type="text"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"/>
                <textarea 
                id="binary" 
                value={binary} 
                readOnly placeholder="Binary output"/>
                <button 
                id="convert" 
                onClick={convertToBinary}> 
                Convert</button>
            </div>
    );
};
export default Converter;