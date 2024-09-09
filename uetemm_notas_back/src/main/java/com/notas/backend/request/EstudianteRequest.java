package com.notas.backend.request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EstudianteRequest {
    
    public int id;
    public String form_id;

    //public String nombres;
    public String apellidosNombres;
    public String cedula;
    public String palabraSeguridad;
    public int curso_id;
    public int grupoEtnico;
    public int sexo;
    public String direccionDomicilio;
    public String telefonoDomicilio;
    public String telefonoCelularMadre;
    public String telefonoCelularPadre;
    public Date fechaNacimiento;
    public String lugarNacimiento;
    public boolean estado;

    // ************************* */
    // * DATOS DE LA MADRE */ ****/
    // ************************* */
    public String nombresMadre;
    public String apellidosMadre;
    public String cedulaMadre;
    public Date fechaNacimientoMadre;
    public int estadoCivilMadre;
    public int nivelInstruccionMadre;
    public String direccionDomicilioMadre;
    public String telefonoDomicilioMadre;
    public String lugarTrabajoMadre;
    public String madreTelefonoTrabajo;
    public String telefonoTrabajoMadre;
    public String correoElectronicoMadre;
    public String ocupacionMadre;



    // ************************* */
    // * DATOS DEL PADRE */ ******/
    // ************************* */
    public String nombresPadre;
    public String apellidosPadre;
    public String cedulaPadre;
    public Date fechaNacimientoPadre;
    public int estadoCivilPadre;
    public int nivelInstruccionPadre;
    public String direccionDomicilioPadre;
    public String telefonoDomicilioPadre;
    public String lugarTrabajoPadre;
    public String PadreTelefonoTrabajo;
    public String telefonoTrabajoPadre;
    public String correoElectronicoPadre;
    public String ocupacionPadre;

    // ************************* */
    // * DATOS DEL REPRESENTANTE */
    // ************************* */
    public String nombresRepresentante;
    public String apellidosRepresentante;
    public String cedulaRepresentante;
    public Date fechaNacimientoRepresentante;
    public int estadoCivilRepresentante;
    public int nivelInstruccionRepresentante;
    public String direccionDomicilioRepresentante;
    public String telefonoDomicilioRepresentante;
    public String lugarTrabajoRepresentante;
    public String RepresentanteTelefonoTrabajo;
    public String telefonoTrabajoRepresentante;
    public String correoElectronicoRepresentante;
    public String ocupacionRepresentante;
    public String parentescoRepresentante;
    public String telefonoCelularRepresentante;

    // ************************* */
    // * DATOS DEL FAMILIARES ** */
    // ************************* */
    public String familiaUnionPadres;
    public Integer familiaNumeroHijos;
    public Integer familiaNumeroHijosVarones;
    public Integer familiaNumeroHijosMujeres;
    public Integer familiaNumeroPuestoEntreHermanos;
    public String familiaDetallePersonsasVivenConEstudiante;
    public Integer familiaNumeroFamiliaresDiscapacidad;
    public String familiaFamiliaresDiscapacidadDescripcion;
    public String familiaTipoVivienda;
    public String familiaTipoViviendaOtro;
    public String familiaServiciosBasicos;


    // ! SERVICIOS QUE POSEE, CREAR TABLA EN BASE

    // *******************************/
    // * ANTECEDENTES EN LA MADRE ****/
    // *******************************/
    public Integer antecedentesMadreDificultadEmbarazo;
    public String antecedentesMadreDificultadEmbarazoDescripcion;
    public Integer antecedentesMadreDificultadParto;
    public String antecedentesMadreDificultadPartoDescripcion; 

    // **********************************/
    // * ANTECEDENTES DEL ESTUDIANTE ****/
    // **********************************/
    public String antecedentesEstudianteDatosNinez;
    public String antecedentesEstudianteHistoriaEscolar;
    public Integer antecedentesEstudianteNecesidadEducativaEspecial;
    public String antecedentesEstudianteNumeroCarne;
    public Integer antecedentesEstudiantePorcentajeDiscapacidad;
    public Integer antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion;
    public String antecedentesEstudianteDatosRelevantes;
    public Integer antecedentesEstudianteTomaMedicamento;
    public String antecedentesEstudianteMedicamentoDescripcion;
    public String antecedentesEstudianteMedicamentoRazon;
    

    public String antecedentesEstudianteRepiteAnios;
    public String antecedentesEstudianteAniosRepetidos;

    // ! AÑOS REPETIDOS, CREAR TABLA EN BASE
    public String seguimiento;
}
