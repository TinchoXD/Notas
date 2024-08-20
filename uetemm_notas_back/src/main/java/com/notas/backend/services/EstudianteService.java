package com.notas.backend.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notas.backend.model.Catalogo;
import com.notas.backend.model.Curso;
import com.notas.backend.model.Estudiante;
import com.notas.backend.repository.EstudianteRepository;
import com.notas.backend.request.EstudianteRequest;
import com.notas.backend.response.MessageResponse;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EstudianteService {

    @Autowired
    EstudianteRepository estudianteRepository;

    public List<Estudiante> getAllEstudiantes() {
        return estudianteRepository.findAll();
    }

    public Estudiante getEstudianteById(int id) {
        return estudianteRepository.findById(id);
    }

    public List<Estudiante> getEstudiantesByCurso(int curso_id) {
        return estudianteRepository.findByCursoId(curso_id);

    }

    @Transactional
    public MessageResponse updateEstudiante(EstudianteRequest estudianteRequest) {

        Estudiante estudiante = estudianteRepository.findById(estudianteRequest.id);

        try {
            switch (estudianteRequest.form_id) {
                case "1":
                    estudiante.nombres = estudianteRequest.nombres;
                    estudiante.apellidos = estudianteRequest.apellidos;
                    estudiante.lugarNacimiento = estudianteRequest.lugarNacimiento;
                    estudiante.fechaNacimiento = estudianteRequest.fechaNacimiento;
                    estudiante.cedula = estudianteRequest.cedula;
                    estudiante.curso = new Curso(estudianteRequest.curso_id, null, null, null, null, null, null, null,
                            0, null);
                    estudiante.grupoEtnico = new Catalogo(estudianteRequest.grupoEtnico, null, null, null);
                    estudiante.sexo = new Catalogo(estudianteRequest.sexo, null, null, null);
                    estudiante.domicilio = estudianteRequest.direccionDomicilio;
                    estudiante.telefonoDomicilio = estudianteRequest.telefonoDomicilio;
                    estudiante.telefonoCelularMadre = estudianteRequest.telefonoCelularMadre;
                    estudiante.telefonoCelularPadre = estudianteRequest.telefonoCelularPadre;
                    break;

                case "2":
                    estudiante.madreNombres = estudianteRequest.nombresMadre;
                    estudiante.madreApellidos = estudianteRequest.apellidosMadre;
                    estudiante.madreCedula = estudianteRequest.cedulaMadre;
                    estudiante.madreEstadoCivil = new Catalogo(estudianteRequest.estadoCivilMadre, null, null, null);
                    estudiante.madreNivelInstruccion = new Catalogo(estudianteRequest.nivelInstruccionMadre, null, null,
                            null);

                    estudiante.madreDireccionDomicilio = estudianteRequest.direccionDomicilioMadre;
                    estudiante.madreTelefonoDomicilio = estudianteRequest.telefonoDomicilioMadre;
                    estudiante.madreLugarTrabajo = estudianteRequest.lugarTrabajoMadre;
                    estudiante.madreTelefonoTrabajo = estudianteRequest.telefonoTrabajoMadre;
                    estudiante.madreCorreo = estudianteRequest.correoElectronicoMadre;
                    estudiante.madreFechaNacimiento = estudianteRequest.fechaNacimientoMadre;
                    estudiante.madreOcupacion = estudianteRequest.ocupacionMadre;
                    break;

                case "3":
                    estudiante.padreNombres = estudianteRequest.nombresPadre;
                    estudiante.padreApellidos = estudianteRequest.apellidosPadre;
                    estudiante.padreCedula = estudianteRequest.cedulaPadre;
                    estudiante.padreEstadoCivil = new Catalogo(estudianteRequest.estadoCivilPadre, null, null, null);
                    estudiante.padreNivelInstruccion = new Catalogo(estudianteRequest.nivelInstruccionPadre, null, null,
                            null);
                    estudiante.padreDireccionDomicilio = estudianteRequest.direccionDomicilioPadre;
                    estudiante.padreTelefonoDomicilio = estudianteRequest.telefonoDomicilioPadre;
                    estudiante.padreLugarTrabajo = estudianteRequest.lugarTrabajoPadre;
                    estudiante.padreTelefonoTrabajo = estudianteRequest.telefonoTrabajoPadre;
                    estudiante.padreCorreo = estudianteRequest.correoElectronicoPadre;
                    estudiante.padreFechaNacimiento = estudianteRequest.fechaNacimientoPadre;
                    estudiante.padreOcupacion = estudianteRequest.ocupacionPadre;
                    break;

                case "4":
                    estudiante.representanteNombres = estudianteRequest.nombresRepresentante;
                    estudiante.representanteApellidos = estudianteRequest.apellidosRepresentante;
                    estudiante.representanteCedula = estudianteRequest.cedulaRepresentante;
                    estudiante.representanteEstadoCivil = new Catalogo(estudianteRequest.estadoCivilRepresentante, null,
                            null, null);
                    estudiante.representanteNivelInstruccion = new Catalogo(
                            estudianteRequest.nivelInstruccionRepresentante, null, null,
                            null);
                    estudiante.representanteDireccionDomicilio = estudianteRequest.direccionDomicilioRepresentante;
                    estudiante.representanteTelefonoDomicilio = estudianteRequest.telefonoDomicilioRepresentante;
                    estudiante.representanteLugarTrabajo = estudianteRequest.lugarTrabajoRepresentante;
                    estudiante.representanteTelefonoTrabajo = estudianteRequest.telefonoTrabajoRepresentante;
                    estudiante.representanteCorreo = estudianteRequest.correoElectronicoRepresentante;
                    estudiante.representanteFechaNacimiento = estudianteRequest.fechaNacimientoRepresentante;
                    estudiante.representanteOcupacion = estudianteRequest.ocupacionRepresentante;
                    estudiante.representanteParentesco = estudianteRequest.parentescoRepresentante;
                    estudiante.representanteTelefonoCelular = estudianteRequest.telefonoCelularRepresentante;

                case "5":

                    estudiante.familiaUnionPadres = estudianteRequest.familiaUnionPadres;
                    estudiante.familiaNumeroHijos = estudianteRequest.familiaNumeroHijos;
                    estudiante.familiaNumeroHijosVarones = estudianteRequest.familiaNumeroHijosVarones;
                    estudiante.familiaNumeroHijosMujeres = estudianteRequest.familiaNumeroHijosMujeres;
                    estudiante.familiaNumeroPuestoEntreHermanos = estudianteRequest.familiaNumeroPuestoEntreHermanos;
                    estudiante.familiaDetallePersonsasVivenConEstudiante = estudianteRequest.familiaDetallePersonsasVivenConEstudiante;
                    estudiante.familiaNumeroFamiliaresDiscapacidad = estudianteRequest.familiaNumeroFamiliaresDiscapacidad;
                    estudiante.familiaFamiliaresDiscapacidadDescripcion = estudianteRequest.familiaFamiliaresDiscapacidadDescripcion;
                    estudiante.familiaTipoVivienda = estudianteRequest.familiaTipoVivienda;
                    estudiante.familiaTipoViviendaOtro = estudianteRequest.familiaTipoViviendaOtro;
                    estudiante.familiaServiciosBasicos = estudianteRequest.familiaServiciosBasicos;

                case "6":
                    estudiante.antecedentesMadreDificultadEmbarazo = estudianteRequest.antecedentesMadreDificultadEmbarazo;
                    estudiante.antecedentesMadreDificultadEmbarazoDescripcion = estudianteRequest.antecedentesMadreDificultadEmbarazoDescripcion;
                    estudiante.antecedentesMadreDificultadParto = estudianteRequest.antecedentesMadreDificultadParto;
                    estudiante.antecedentesMadreDificultadPartoDescripcion = estudianteRequest.antecedentesMadreDificultadPartoDescripcion;
                    break;

                case "7":
                    estudiante.antecedentesEstudianteDatosNinez = estudianteRequest.antecedentesEstudianteDatosNinez;
                    estudiante.antecedentesEstudianteHistoriaEscolar = estudianteRequest.antecedentesEstudianteHistoriaEscolar;
                    estudiante.antecedentesEstudianteNecesidadEducativaEspecial = estudianteRequest.antecedentesEstudianteNecesidadEducativaEspecial;
                    estudiante.antecedentesEstudianteNumeroCarne = estudianteRequest.antecedentesEstudianteNumeroCarne;
                    estudiante.antecedentesEstudiantePorcentajeDiscapacidad = estudianteRequest.antecedentesEstudiantePorcentajeDiscapacidad;
                    estudiante.antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion = estudianteRequest.antecedentesEstudiantePresentaNecesidadEducativaEspecialInstitucion;
                    estudiante.antecedentesEstudianteDatosRelevantes = estudianteRequest.antecedentesEstudianteDatosRelevantes;
                    estudiante.antecedentesEstudianteTomaMedicamento = estudianteRequest.antecedentesEstudianteTomaMedicamento;
                    estudiante.antecedentesEstudianteMedicamentoDescripcion = estudianteRequest.antecedentesEstudianteMedicamentoDescripcion;
                    estudiante.antecedentesEstudianteMedicamentoRazon = estudianteRequest.antecedentesEstudianteMedicamentoRazon;
                    estudiante.antecedentesEstudianteRepiteAnios = estudianteRequest.antecedentesEstudianteRepiteAnios;
                    estudiante.antecedentesEstudianteAniosRepetidos = estudianteRequest.antecedentesEstudianteAniosRepetidos;
                    break;

                case "8":
                    estudiante.seguimiento = estudianteRequest.seguimiento;
                    break;
                default:
                    break;
            }

            this.estudianteRepository.save(estudiante);

            System.out.println();

            return new MessageResponse("El ESTUDIANTE se actualizó satisfactoriamente.");

        } catch (Exception e) {
            return new MessageResponse("Error al guardar los datos del ESTUDIANTE.");
        }
    }

}
