import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildMetadata } from '@/lib/metadata';
import { ShieldCheck, Truck, Stethoscope, CircleDollarSign, AtSign, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Declaração de Direitos | Theracorp',
  description: 'Conheça seus direitos como paciente da Theracorp.',
  path: '/declaracao-direitos'
});

export default function DeclaracaoDireitosPage() {
  return (
    <section className="bg-white py-16 md:py-20 font-red-hat">
      <div className="mx-auto w-full max-w-[900px] px-4 md:px-8">
        <h1 className="header-1 text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">
          Declaração de Direitos
        </h1>
        <p className="content-2 mt-3 text-sm text-tc-gray-500">Última atualização: 10 de maio de 2026</p>

        <div className="mt-10 space-y-8">
          <div className="tc-card">
            <p className="content-2 text-sm text-tc-gray-500">
              <strong className="text-tc-gray-900">
                Na Theracorp, acreditamos que pacientes informados são pacientes empoderados.
              </strong>
            </p>
          </div>
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">1. Direito a Informação</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Você tem direito a informações claras sobre diagnósticos e tratamentos.</p>
          </div>
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">2. Direito ao Consentimento</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Nenhum procedimento será realizado sem seu consentimento.</p>
          </div>
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">3. Direito à Privacidade</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Suas informações de saúde são confidenciais.</p>
          </div>
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">4. Direito ao Acesso</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Você pode acessar seus registros médicos.</p>
          </div>
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">5. Atendimento Respeitoso</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Você será tratado com dignidade e respeito.</p>
          </div>
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">6. Segunda Opinião</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Você pode buscar uma segunda opinião médica.</p>
          </div>
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">7. Transparência de Custos</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Você receberá informações detalhadas sobre custos.</p>
          </div>
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">8. Reclamações</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Você pode apresentar reclamações sem retaliação.</p>
          </div>
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">Contato</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Dúvidas: entre em contato conosco.</p>
          </div>
        </div>
      </div>
    
{/* Barra de confiança */}
        <div className="mt-16 border-t border-tc-gray-200">
          <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-tc-gray-200">
              <div className="flex items-center gap-3 py-4 lg:py-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                <ShieldCheck className="h-6 w-6 text-tc-gray-700 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-tc-gray-900 whitespace-nowrap">Garantia Theracorp</span>
              </div>
              <div className="flex items-center gap-3 py-4 lg:py-0 lg:px-6">
                <Truck className="h-6 w-6 text-tc-gray-700 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-tc-gray-900 whitespace-nowrap">Entrega rápida e gratuita</span>
              </div>
              <div className="flex items-center gap-3 py-4 lg:py-0 lg:px-6">
                <Stethoscope className="h-6 w-6 text-tc-gray-700 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-tc-gray-900 whitespace-nowrap">Planos e acompanhamento médico</span>
              </div>
              <div className="flex items-center gap-3 py-4 lg:py-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
                <CircleDollarSign className="h-6 w-6 text-tc-gray-700 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-sm font-semibold text-tc-gray-900 whitespace-nowrap">Sem taxas ocultas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de contato */}
        <div className="border-t border-tc-gray-200">
          <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8 py-5">
            <div className="flex flex-row items-center justify-between gap-4 flex-nowrap">
              <Link href="/" aria-label="Theracorp, página inicial">
                <Image src="/logo-theracorp.png" alt="Logo Theracorp" width={804} height={169} className="h-8 w-auto" />
              </Link>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <div className="flex items-center gap-1.5 text-xs text-tc-gray-600 whitespace-nowrap">
                  <AtSign className="h-3.5 w-3.5 text-tc-gray-500" strokeWidth={1.5} />
                  <a href="mailto:help@theracorp.org" className="hover:text-tc-gray-900 hover:underline">help@theracorp.org</a>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-tc-gray-600 whitespace-nowrap">
                  <Phone className="h-3.5 w-3.5 text-tc-gray-500" strokeWidth={1.5} />
                  <a href="tel:+55449914808833" className="hover:text-tc-gray-900 hover:underline">(44) 9 9148-08833</a>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-tc-gray-600 whitespace-nowrap">
                  <Mail className="h-3.5 w-3.5 text-tc-gray-500" strokeWidth={1.5} />
                  <span>Av. Ayrton Senna da Silva, 1055 - Guanabara, Londrina - PR</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Avisos e disclaimers */}
        <div className="border-t border-tc-gray-200">
          <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8 py-8">
            <div className="space-y-4 text-xs text-tc-gray-500 leading-relaxed">
              <p>A avaliação disponibilizada no site da Theracorp não estabelece uma relação médico-paciente entre o indivíduo que a preenche e a Theracorp. Os médicos licenciados Theracorp seguem protocolos médicos rigorosos, concebidos para a segurança do paciente, estabelecemos critérios de exclusão para determinar se um indivíduo não se qualifica para o uso de GLP-1. As respostas fornecidas pelo indivíduo na avaliação da Theracorp determinam se ele é considerado inelegível para a medicação com GLP-1, e um profissional clínico da Theracorp se reunirá com o indivíduo após a finalização da compra para determinar se ele se qualifica para uma prescrição. Os profissionais clínicos da Theracorp têm a decisão de prescrever GLP-1 manipulado aos pacientes.</p>

              <p>Todas as alegações e benefícios neste site referem-se a dados autodeclarados de clientes de GLP-1 em um plano de tratamento que inclui medicamentos GLP-1 manipulados e consultas com profissionais médicos. Os clientes informaram seu peso no questionário médico inicial a cada 3-4 semanas subsequentes. Os resultados dos medicamentos manipulados encontrados na plataforma Theracorp podem variar e ser afetados pela adesão do indivíduo ao programa e às recomendações do seu médico. Os GLP-1 manipulados são produzidos em instalações regulamentadas pela ANVISA. Embora essas instalações sejam altamente regulamentadas, os medicamentos não são aprovados pela ANVISA nem avaliados quanto à segurança, eficácia ou qualidade. A decisão de usar medicamentos manipulados é orientada pelo julgamento médico do profissional licenciado, que é baseado em uma consulta de telemedicina e no histórico médico.</p>

              <p>Recomendamos que todos os potenciais usuários de medicamentos manipulados conversem com seu médico sobre os riscos e benefícios específicos que podem advir do uso desses medicamentos. A Theracorp não produz medicamentos manipulados e os indivíduos podem receber medicamentos com aparência diferente daquela apresentada no site.</p>

              <p><strong className="text-tc-gray-700">Parceiros Farmacêuticos:</strong> Temos parceria com diversas farmácias certificadas nos Brasil para oferecer os melhores produtos e a melhor experiência possível aos nossos membros. Nossa equipe se reúne regularmente com as farmácias para discutir possíveis faltas de produtos, atrasos no envio e obter relatórios atualizados sobre os testes de medicamentos.</p>

              <p>*Os resultados variam de acordo com o peso inicial e a adesão ao programa. Medidas de perda de peso nos quadris, cintura, peito, coxas e braços no primeiro mês. Os pacientes praticaram exercícios diariamente e seguiram uma dieta com redução de calorias. A perda de gordura relatada não é típica. Os resultados podem variar. A prescrição de medicamentos fica a critério dos profissionais de saúde e pode não ser adequada para todos. Pacientes tratados com Theracorp geralmente apresentam perda de peso de 0,5 a 1 kg por semana após 4 semanas, com uma dieta saudável e mudanças nos exercícios. Consulte um profissional de saúde antes de usar qualquer medicamento ou iniciar qualquer programa de perda de peso. *Com base na perda de peso média relatada por pacientes sem diabetes que atingiram e mantiveram uma dose de 2,4 mg/semana de tratamento com GLP-1, juntamente com uma dieta com redução de calorias e aumento da atividade física.</p>

              <p>A medicação está incluída no custo do Programa Theracorp. Wegovy® é aprovado pelo ANVISA para perda de peso. Ozempic® é aprovado pelo ANVISA para o tratamento de diabetes tipo 2, mas também pode ser prescrito para perda de peso. As marcas registradas, marcas de serviço, nomes comerciais (Wegovy®, Ozempic®) e produtos exibidos neste site são protegidos e pertencem aos seus respectivos proprietários. O tratamento médico é fornecido pela "CareGLP Affiliated PCs" e pela OpenLoop Health, redes afiliadas para corporações e associações médicas profissionais. Nenhum dado, foto, alegação ou qualquer outra informação está associada a resultados derivados de ensaios clínicos, estudos ou informações públicas e representa sempre a experiência do paciente Theracorp.</p>

              <p>Alguns materiais neste site, incluindo textos, imagens e outras mídias, podem ser gerados ou aprimorados por meio de tecnologias de inteligência artificial. Não garantimos a exatidão, integridade ou confiabilidade de tais conteúdos. As pessoas que aparecem nos anúncios podem ser atores ou modelos.</p>

              <p>Os depoimentos no site são de pacientes da Theracorp. Para preservar a privacidade dos pacientes, as imagens que representam esses depoimentos podem utilizar modelos.</p>

              <p>Ao aceitar nossos Termos de Uso, você também compreende e concorda que a Theracorp não atua como farmácia, nem controla ou interfere em quaisquer serviços desse tipo. Ao aceitar estes Termos de Uso, você compreende e concorda que pode estar estabelecendo um relacionamento com uma farmácia, farmacêutico e/ou grupo de farmácias ou outro tipo de relacionamento com uma ou mais entidades terceirizadas.</p>
            </div>
          </div>
        </div>

</section>
  );
}