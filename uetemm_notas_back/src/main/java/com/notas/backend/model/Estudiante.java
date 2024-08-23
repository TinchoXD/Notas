package com.notas.backend.model;

import java.util.Date;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "estudiante", uniqueConstraints = { @UniqueConstraint(columnNames = { "estu_id" }) })
@AttributeOverrides({
        @AttributeOverride(name = "fecha_creacion", column = @Column(name = "estu_fecha_creacion")),
        @AttributeOverride(name = "fecha_modificacion", column = @Column(name = "estu_fecha_modificacion")),
        @AttributeOverride(name = "user_creacion", column = @Column(name = "estu_user_creacion")),
        @AttributeOverride(name = "user_modificacion", column = @Column(name = "estu_user_modificacion")),
})
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "estu_id", nullable = false)
    public int id;

/*     @Column(name = "estu_nombres", nullable = true)
    public String nombres; */

    @Column(name = "estu_apellidos_nombres", nullable = true)
    public String apellidosNombres;

    @Column(name = "estu_cedula", nullable = true)
    public String cedula;

    @ManyToOne
    @JoinColumn(name = "curso_id", nullable = true)
    public Curso curso;

    @ManyToOne
    @JoinColumn(name = "estu_grupo_etnico", nullable = true)
    public Catalogo grupoEtnico;

    @ManyToOne
    @JoinColumn(name = "estu_sexo", nullable = true)
    public Catalogo sexo;

    @Column(name = "estu_direccion_domicilio", nullable = true)
    public String domicilio;

    @Column(name = "estu_telefono_domicilio", nullable = true)
    public String telefonoDomicilio;

    @Column(name = "estu_telefono_celular_madre", nullable = true)
    public String telefonoCelularMadre;

    @Column(name = "estu_telefono_celular_padre", nullable = true)
    public String telefonoCelularPadre;

    @Column(name = "estu_fecha_nacimiento", nullable = true)
    public Date fechaNacimiento;

    @Column(name = "estu_lugar_nacimiento", nullable = true)
    public String lugarNacimiento;

    // ************************* */
    // * DATOS DE LA MADRE */ ****/
    // ************************* */

    @Column(name = "estu_madre_nombres", nullable = true)
    public String madreNombres;

    @Column(name = "estu_madre_apellidos", nullable = true)
    public String madreApellidos;

    @Column(name = "estu_madre_cedula", nullable = true)
    public String madreCedula;

    @ManyToOne
    @JoinColumn(name = "estu_madre_estado_civil", nullable = true)
    public Catalogo madreEstadoCivil;

    @ManyToOne
    @JoinColumn(name = "estu_madre_nivel_instruccion", nullable = true)
    public Catalogo madreNivelInstruccion;

    @Column(name = "estu_madre_direccion_domicilio", nullable = true)
    public String madreDireccionDomicilio;

    @Column(name = "estu_madre_telefono_domicilio", nullable = true)
    public String madreTelefonoDomicilio;

    @Column(name = "estu_madre_lugar_trabajo", nullable = true)
    public String madreLugarTrabajo;

    @Column(name = "estu_madre_telefono_trabajo", nullable = true)
    public String madreTelefonoTrabajo;

    @Column(name = "estu_madre_correo", nullable = true)
    public String madreCorreo;

    @Column(name = "estu_madre_fecha_nacimiento", nullable = true)
    public Date madreFechaNacimiento;

    @Column(name = "estu_madre_ocupacion", nullable = true)
    public String madreOcupacion;

    // ************************* */
    // * DATOS DEL PADRE */ ******/
    // ************************* */

    @Column(name = "estu_padre_nombres", nullable = true)
    public String padreNombres;

    @Column(name = "estu_padre_apellidos", nullable = true)
    public String padreApellidos;

    @Column(name = "estu_padre_cedula", nullable = true)
    public String padreCedula;

    @ManyToOne
    @JoinColumn(name = "estu_padre_estado_civil", nullable = true)
    public Catalogo padreEstadoCivil;

    @ManyToOne
    @JoinColumn(name = "estu_padre_nivel_instruccion", nullable = true)
    public Catalogo padreNivelInstruccion;

    @Column(name = "estu_padre_direccion_domicilio", nullable = true)
    public String padreDireccionDomicilio;

    @Column(name = "estu_padre_telefono_domicilio", nullable = true)
    public String padreTelefonoDomicilio;

    @Column(name = "estu_padre_lugar_trabajo", nullable = true)
    public String padreLugarTrabajo;

    @Column(name = "estu_padre_telefono_trabajo", nullable = true)
    public String padreTelefonoTrabajo;

    @Column(name = "estu_padre_correo", nullable = true)
    public String padreCorreo;

    @Column(name = "estu_padre_fecha_nacimiento", nullable = true)
    public Date padreFechaNacimiento;

    @Column(name = "estu_padre_ocupacion", nullable = true)
    public String padreOcupacion;

    // ************************* */
    // * DATOS DEL REPRESENTANTE */
    // ************************* */

    @Column(name = "estu_representante_nombres", nullable = true)
    public String representanteNombres;

    @Column(name = "estu_representante_apellidos", nullable = true)
    public String representanteApellidos;

    @Column(name = "estu_representante_cedula", nullable = true)
    public String representanteCedula;

    @ManyToOne
    @JoinColumn(name = "estu_representante_estado_civil", nullable = true)
    public Catalogo representanteEstadoCivil;

    @ManyToOne
    @JoinColumn(name = "estu_representante_nivel_instruccion", nullable = true)
    public Catalogo representanteNivelInstruccion;

    @Column(name = "estu_representante_direccion_domicilio", nullable = true)
    public String representanteDireccionDomicilio;

    @Column(name = "estu_representante_telefono_domicilio", nullable = true)
    public String representanteTelefonoDomicilio;

    @Column(name = "estu_representante_lugar_trabajo", nullable = true)
    public String representanteLugarTrabajo;

    @Column(name = "estu_representante_telefono_trabajo", nullable = true)
    public String representanteTelefonoTrabajo;

    @Column(name = "estu_representante_correo", nullable = true)
    public String representanteCorreo;

    @Column(name = "estu_representante_fecha_nacimiento", nullable = true)
    public Date representanteFechaNacimiento;

    @Column(name = "estu_representante_ocupacion", nullable = true)
    public String representanteOcupacion;

    @Column(name = "estu_representante_parentesco", nullable = true)
    public String representanteParentesco;

    @Column(name = "estu_representante_telefono_celular", nullable = true)
    public String representanteTelefonoCelular;

    // ************************* */
    // * DATOS DEL FAMILIARES ** */
    // ************************* */

    @Column(name = "estu_dato_familiar_union_padres", nullable = true)
    public String familiaUnionPadres;

    @Column(name = "estu_dato_familiar_numero_hijos", nullable = true)
    public Integer familiaNumeroHijos;

    @Column(name = "estu_dato_familiar_numero_hijos_varones", nullable = true)
    public Integer familiaNumeroHijosVarones;

    @Column(name = "estu_dato_familiar_numero_hijos_mujeres", nullable = true)
    public Integer familiaNumeroHijosMujeres;

    @Column(name = "estu_dato_familiar_puesto_entre_hermanos", nullable = true)
    public Integer familiaNumeroPuestoEntreHermanos;

    @Column(name = "estu_dato_familiar_personas_viven_con_estudiante", nullable = true)
    public String familiaDetallePersonsasVivenConEstudiante;

    @Column(name = "estu_dato_familiar_familiares_discapacidad", nullable = true)
    public Integer familiaNumeroFamiliaresDiscapacidad;

    @Column(name = "estu_dato_familiar_familiares_discapacidad_descripcion", nullable = true) 
    public String familiaFamiliaresDiscapacidadDescripcion;

    @Column(name = "estu_dato_familiar_tipo_vivienda", nullable = true)
    public String familiaTipoVivienda;

    @Column(name = "estu_dato_familiar_tipo_vivienda_otro", nullable = true)
    public String familiaTipoViviendaOtro;
    
    @Column(name = "estu_dato_familiar_servicios_basicos", nullable = true)
    public String familiaServiciosBasicos;

    // ! SERVICIOS QUE POSEE, CREAR TABLA EN BASE

    // *******************************/
    // * ANTECEDENTES EN LA MADRE ****/
    // *******************************/

    @Column(name = "estu_antecedente_madre_dificultad_embarazo", nullable = true)
    public Integer antecedentesMadreDificultadEmbarazo;

    @Column(name = "estu_antecedente_madre_dificultad_embarazo_descripcion", nullable = true)
    public String antecedentesMadreDificultadEmbarazoDescripcion;

    @Column(name = "estu_antecedente_madre_dificultad_parto", nullable = true)
    public Integer antecedentesMadreDificultadParto;

    @Column(name = "estu_antecedente_madre_dificultad_parto_descripcion", nullable = true)
    public String antecedentesMadreDificultadPartoDescripcion; 

    // **********************************/
    // * ANTECEDENTES DEL ESTUDIANTE ****/
    // **********************************/

    @Column(name = "estu_antecedente_estudiante_datos_relevantes_ninez", nullable = true)
    public String antecedentesEstudianteDatosNinez;

    @Column(name = "estu_antecedente_estudiante_historia_escolar", nullable = true)
    public String antecedentesEstudianteHistoriaEscolar;

    @Column(name = "estu_antecedente_estudiante_nececidad_educativa_especial", nullable = true)
    public Integer antecedentesEstudianteNecesidadEducativaEspecial;

    @Column(name = "estu_antecedente_estudiante_numero_carne_discapacidad", nullable = true)
    public String antecedentesEstudianteNumeroCarne;

    @Column(name = "estu_antecedente_estudiante_porcentaje_discapacidad", nullable = true)
    public Integer antecedentesEstudiantePorcentajeDiscapacidad;

    @Column(name = "estu_antecedente_estudiante_presenta_nee_institucion", nullable = true)
    public Integer antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion;

    @Column(name = "estu_antecedente_estudiante_datos_relevantes", nullable = true)
    public String antecedentesEstudianteDatosRelevantes;

    @Column(name = "estu_antecedente_estudiante_toma_medicamento", nullable = true)
    public Integer antecedentesEstudianteTomaMedicamento;

    @Column(name = "estu_antecedente_estudiante_medicamento_descripcion", nullable = true)
    public String antecedentesEstudianteMedicamentoDescripcion;

    @Column(name = "estu_antecedente_estudiante_medicamento_razon", nullable = true)
    public String antecedentesEstudianteMedicamentoRazon;
    
    
    @Column(name = "estu_antecedente_estudiante_repite_anios", nullable = true)
    public String antecedentesEstudianteRepiteAnios;

    @Column(name = "estu_antecedente_estudiante_anios_repetidos", nullable = true)
    public String antecedentesEstudianteAniosRepetidos;

    // ! AÑOS REPETIDOS, CREAR TABLA EN BASE

    @Column(name = "estu_seguimiento", nullable = true)
    public String seguimiento;

}
