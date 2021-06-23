
import './Footer.scss'

export const Footer = ({ dataURL }) => {

    const onPrintUrl=()=>{
        console.log(dataURL , 'dataURL');
    }

    
        return (
            <footer className="footer">
              <button className="btn-footer" onClick={onPrintUrl} >Print URL</button>
            </footer>
        )
    
}
