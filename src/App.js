import { useState, useRef } from 'react';
import './App.css';

function App() {

  let ModalContainar = useRef()

  const callModal = () => {


    ModalContainar.current.style.display = "flex"


  }

  const personelBtn = () => {

    callModal()

    // console.log(modal)
  }
  // modala tıklandığında modal kalkması için documentile body çekip parametre olarak event verdik event ile classname modal-containar 
  // olanını ve( modal içerisindeki değer true olarak kalmıştı.modal true ise display none oldu.
  document.querySelector("body").addEventListener("click", (event) => {

    if (event.target.className === "modal-containar") {

      ModalContainar.current.style.display = "none"


    }
  })

  const randomıd = () => {
    return Math.floor(Math.random() * 10000)
  }


  //içeriğn nasıl bulunmasını istiyorsak o şekilde bir array obje yazıyoruz...
  const baslangıcdeğerler = [
    {
      id: randomıd(),
      isim: "Melek",
      soyisim: "korkmaz",
      yas: "26",
      email: "korkmaz.melike2727@gmail.com",
      gorev: "EBE",
      telefon: "55555555555"
    },


  ]

  // -------------state kısmı-----------------------

  const [form, Setform] = useState(baslangıcdeğerler)  //form içine gelecek olan veriler burada toparlanıcak
  const [veri, Setveri] = useState("") //input içindeki veriler herdeğiştiğnde buraya gelicek sonradan form içine gönderilicek
  const [ınput, setInput] = useState("") // inputa veriler her değiştinde bu fonksiyon çalışıcak/her arama yapıldığında
  const [Updating, setIsUpdating] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  console.log("edit statenin içindeki elemanlar", editingUser)
  // console.log(form)
  //!input içine gelen verileri yakalamak için onchace eventine bir fonksiyon verdik ve içeriğindeki value ye ulaşıp veriye aktardık
  const guncelle = (event) => {

    //inputlara name verdik ve her tıklanan elemen için value ye eşitledik ve önveciki girdiğmiz verileri kaybetmemek için veriyi kopyaladık
    Setveri({ ...veri, [event.target.name]: event.target.value })
    // editlene veriyi valueden aldık ve ve edituser içine attık
    setEditingUser({ ...editingUser, [event.target.name]: event.target.value })

    console.log("veriden gelen veri",{ ...veri, [event.target.name]: event.target.value })
    console.log("editen gelen veri", { ...editingUser, [event.target.name]: event.target.value })



  }

  // console.log("veri", veri)
  //  butona bir ekleme olayı verdik 



  const personelEkle = (e) => {

    // eğer güncelleme isteği true  ise

    if (Updating === true) {
      // Form üzerinde dön ve değerleri manüple et
      const updatedForm = form.map(user => {

        // kullanıcı id si editlene veriye eşit ise eğer değişiklik var ise editlen miş hali ile gönder
        // değil ise user ı direk tekrar gönder

        if (user.id === editingUser.id) {

          return editingUser
        } else {
          return user
        }



      });

      Setform(updatedForm);
      ModalContainar.current.style.display = "none"


    } else {


      if (Updating === false) {

        const veriEşitle = {
          id: randomıd(),
          isim: veri.isim,
          soyisim: veri.soyisim,
          yas: veri.yas,
          email: veri.email,
          telefon: veri.telefon,
          gorev: veri.gorev
        }

        //verilerin kopyasını oluşturup forma gönder dedik 
        Setform([...form, veriEşitle])

        // modalı kapat
        ModalContainar.current.style.display = "none"

      }
      Setveri("")

    }

    e.preventDefault() //form kaybolmasını engelliyor
    // }
  }
  // console.log("form", form)
  //!inputa bir ara diye fonksiyon tanımladık parametre olarak event verdik.kullanıcı her bir harf girdiğnde burası çalışıcak

  // kullanıcı arama
  const Search = (e) => {
    // console.log(event.target.value)
    setInput(e.target.value)


  }
  //  console.log(ınput)
  //  verileri silme kısmı
  // verilerden ıd gelsin dedik  bu silme işlemi için form içeriğini değiştiren setformdan yararlandık setform içerisine
  // form üzerinden bir filtreleme yaptık bir colback istediği için veri olarak tanımlayıp verinin id sine ulaştık
  // ver içeriğindeki id olmasın diye sonlandırdık.
  const sıl = (id) => {


    Setform(form.filter(veri => veri.id !== id))

    return;
  }

  // güncelle butonuna tıklandığında ilk burası çalışcak ve kullanıcı id si gelecek
  const update = (id) => {

    //ve güncelleme isteği ni true yap
    setIsUpdating(true);

    // form elemanları üzerinde dön ve kullanıcı id yi bul
    const user = form.find(kullanici => kullanici.id === id);

    // eğer kullanıcı var ise editlemek için state at 
    if (user) {
      setEditingUser(user);

      callModal();
    }
  };

  // console.log(Updating)


  return (

    <>


      <h3 style={{ textAlign: "center", marginTop: "20px" }} >PERSONEL LİSTESİ</h3>
      <div className='navbar-containar'>
        <input onChange={Search} style={{ width: "300px" }} placeholder='Personel Ara' value={ınput}></input>
        <button onClick={personelBtn} type="button" id='personel-btn' class="btn btn-dark">PERSONEL EKLE</button>
      </div>

      <table id='table-containar' class="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">İSİM</th>
            <th scope="col">SOY İSİM</th>
            <th scope="col">YAŞ</th>
            <th style={{ width: "300px" }} scope="col">EMAİL</th>
            <th scope="col">GÖREVİ</th>
            <th scope="col">TELEFON</th>
          </tr>
        </thead>
        <tbody>
          {/* form üzerinde mapleme yaptık ve ekrana yazdırdık */}
          {form.filter(form => form.isim.toLocaleLowerCase().includes(ınput.toLocaleLowerCase())).map((data) => {

            return <tr key={data.id} className='tr-containar'>
              <th scope="row">{data.id}</th>
              <td>{data.isim}</td>
              <td>{data.soyisim}</td>
              <td>{data.yas}</td>
              <td>{data.email}</td>
              <td>{data.gorev}</td>
              <td>{data.telefon}</td>
              <div className='ikon-containar'>
                {/* sıl diye bir fonksiyon tanımladık buradan ıd lere ulaştık */}
                <i onClick={() => sıl(data.id)} class="fa-sharp fa-solid fa-trash"></i>
                <i onClick={() => update(data.id)} class="fa-solid fa-pen-fancy"></i>
              </div>
            </tr>


          })}

        </tbody>
        <div class="modal-containar" className='modal-containar' id="modal-containar" ref={ModalContainar}>
          <div id='form-containar' className='form-containar'>
            <h3 style={{ textAlign: "center" }}>Personel bilgileri</h3>
            <form className='form' style={{ background: "white" }}>
              <input onChange={guncelle} name='isim' type='text' placeholder='ADINIZ' value={Updating ? editingUser.isim : veri.isim}></input>
              <input onChange={guncelle} name='soyisim' type='text' placeholder='SOYADINIZ' value={Updating ? editingUser.soyisim : veri.soyisim}></input>
              <input onChange={guncelle} name='yas' type='number' placeholder='YAŞINIZ' value={Updating ? editingUser.yas : veri.yas}></input>
              <input onChange={guncelle} name='telefon' type='number' placeholder='TELEFON NUMARANIZ' value={Updating ? editingUser.telefon : veri.telefon}></input>
              <input onChange={guncelle} name='email' type='email' placeholder='EMAİL' value={Updating ? editingUser.email : veri.email}></input>
              <input onChange={guncelle} name='gorev' type='text' placeholder='GÖREV' value={Updating ? editingUser.gorev : veri.gorev}></input>
              <button onClick={personelEkle} className='btn btn-dark'>
                {Updating ? 'GÜNCELLE' : 'EKLE'}
              </button>


            </form>


          </div>

        </div>

      </table>


    </>
  );

} export default App;
