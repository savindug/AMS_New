import  React from "react";
import ReactDOM from "react-dom";



class BranchDropdown extends React.Component {

    render() {
        const {handleBranchChange, branch} = this.props;
        return (
            <form >

                <label>
                    Select Branch : {" "}
                    <select value={branch} onChange={handleBranchChange}>
                        <option value="Ahangama">Ahangama</option>
                        <option value="Ahungalla">Ahungalla</option>
                        <option value="Aluthwala">Aluthwala</option>
                        <option value="Ambalangoda">Ambalangoda</option>
                        <option value="Ambana">Ambana</option>
                        <option value="Baddegama">Baddegama</option>
                        <option value="Batapola">Batapola</option>
                        <option value="Elpitiya">Elpitiya</option>
                        <option value="Ethkandura">Ethkandura</option>
                        <option value="Gonadeniya_Udugama">Gonadeniya_Udugama</option>
                        <option value="Gongala_Gonagalapura">Gongala_Gonagalapura</option>
                        <option value="Karandeniya">Karandeniya</option>
                        <option value="Keradewala">Keradewala</option>
                        <option value="Kodagoda_Imaduwa">Kodagoda_Imaduwa</option>
                        <option value="Koggala">Koggala</option>
                        <option value="Labuduwa">Labuduwa</option>
                        <option value="Nagoda_Ethumale">Nagoda_Ethumale</option>
                        <option value="Neluwa">Neluwa</option>
                        <option value="Niyagama">Niyagama</option>
                        <option value="Opatha">Opatha</option>
                        <option value="Pahalagamhaya_Miriswaththa_Benthota">Pahalagamhaya_Miriswaththa_Benthota</option>
                        <option value="Paragoda_Imaduwa">Paragoda_Imaduwa</option>
                        <option value="Pilana">Pilana</option>
                        <option value="Pinkanda">Pinkanda</option>
                        <option value="Pitigala">Pitigala</option>
                        <option value="Rathgama">Rathgama</option>
                        <option value="Thawalama">Thawalama</option>
                        <option value="Urala_Wanduramba">Urala_Wanduramba</option>
                        <option value="Urugasmanhandiya">Urugasmanhandiya</option>
                        <option value="Walahanduwa">Walahanduwa</option>
                        <option value="Wanduramba">Wanduramba</option>
                        <option value="Weragoda">Weragoda</option>
                        <option value="Yakkalamulla">Yakkalamulla</option>

                    </select>
                </label>
                {" "}
                {/* <input type="submit" className="btn btn-success" value="Confirm"/>*/}
            </form>
        );
    }
}

export default BranchDropdown;